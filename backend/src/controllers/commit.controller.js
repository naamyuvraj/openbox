import File from "../models/file.model.js";
import Commit from "../models/commit.model.js";
import Project from "../models/repo.model.js";
import AdmZip from "adm-zip";
import DiffMatchPatch from "diff-match-patch";

// ==============================
// Commit changes / upload ZIP
// ==============================
export const commitChanges = async (req, res) => {
  try {
    const {
      repo_id,
      repo_name,
      repo_description,
      project_name,
      description,
      changes,
      commit_title,
      message,
    } = req.body;
    const user_id = req.user.id;

    let activeRepoId = repo_id;
    let newlyCreatedRepo = null;

    const deriveRepoName = () => {
      if (repo_name && repo_name.trim()) return repo_name.trim();
      if (project_name && project_name.trim()) return project_name.trim();
      if (req.file?.originalname) {
        return req.file.originalname.replace(/\.zip$/i, "").trim();
      }
      return "";
    };

    if (!activeRepoId) {
      const inferredName = deriveRepoName();

      if (!inferredName) {
        return res.status(400).json({
          message:
            "repo_id missing. Provide repo_name/project_name or upload a folder with a valid name.",
        });
      }

      newlyCreatedRepo = new Project({
        name: inferredName,
        description:
          repo_description ||
          description ||
          `Imported from ${req.file?.originalname || "folder upload"}`,
        user_id,
      });

      await newlyCreatedRepo.save();
      activeRepoId = newlyCreatedRepo._id.toString();
    }

    // Handle ZIP upload if present
    const commitFiles = [];

    if (req.file) {
      const zip = new AdmZip(req.file.buffer);
      const zipEntries = zip.getEntries();

      if (zipEntries.length === 0)
        return res.status(400).json({ message: "ZIP file is empty" });

      for (const entry of zipEntries) {
        if (entry.isDirectory) continue;
        if (entry.entryName.startsWith("__MACOSX/") || entry.name.startsWith("._")) continue;

        const content = entry.getData().toString("utf-8");
        const file_path = entry.entryName;
        const file_name = entry.name;

        let file = await File.findOne({ repo_id: activeRepoId, file_path });

        if (!file) {
          file = new File({
            repo_id: activeRepoId,
            user_id,
            file_name,
            file_path,
            latest_content: content,
            latest_version: 1,
          });
          await file.save();
        } else {
          file.latest_content = content;
          file.latest_version += 1;
          file.user_id = user_id;
          await file.save();
        }

        commitFiles.push({
          file_id: file._id,
          file_name: file.file_name,
          file_path: file.file_path,
          version: file.latest_version,
          content: file.latest_content,
        });
      }
    }

    // Handle manual changes array
    if (changes && changes.length > 0) {
      for (const c of changes) {
        let file = await File.findOne({
          repo_id: activeRepoId,
          file_path: c.file_path,
        });

        if (!file) {
          file = new File({
            repo_id: activeRepoId,
            user_id,
            file_name: c.file_name,
            file_path: c.file_path,
            latest_content: c.content,
            latest_version: 1,
          });
          await file.save();
        } else {
          file.latest_content = c.content;
          file.latest_version += 1;
          file.user_id = user_id;
          await file.save();
        }

        commitFiles.push({
          file_id: file._id,
          file_name: file.file_name,
          file_path: file.file_path,
          version: file.latest_version,
          content: file.latest_content,
        });
      }
    }

    if (commitFiles.length === 0)
      return res
        .status(400)
        .json({ message: "No file changes or ZIP provided" });

    // Create commit
    const newCommit = new Commit({
      repo_id: activeRepoId,
      user_id,
      commit_title: commit_title || "Updated files",
      message: message || "",
      files: commitFiles,
    });

    await newCommit.save();

    // Update all files to point to this commit
    for (const f of commitFiles) {
      await File.findByIdAndUpdate(f.file_id, { commit_id: newCommit._id });
    }

    return res.status(201).json({
      message: "Commit created successfully",
      commit: newCommit,
      repo: newlyCreatedRepo,
    });
  } catch (err) {
    console.error("[COMMIT ERROR]", err);
    return res.status(500).json({ error: err.message });
  }
};

// ==============================
// Get single commit
// ==============================
export const getCommit = async (req, res) => {
  try {
    const commit = await Commit.findById(req.params.id);
    if (!commit) return res.status(404).json({ message: "Commit not found" });
    return res.status(200).json({ commit });
  } catch (err) {
    console.error("[GET COMMIT ERROR]", err);
    return res.status(500).json({ error: err.message });
  }
};

// ==============================
// Get all commits for a repo
// ==============================
export const getAllCommits = async (req, res) => {
  try {
    const { repoId } = req.params;
    const commits = await Commit.find({ repo_id: repoId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ commits });
  } catch (err) {
    console.error("[GET ALL COMMITS ERROR]", err);
    return res.status(500).json({ error: err.message });
  }
};



// ==============================
// Get diff of a commit 
// ==============================
export const getCommitDiff = async (req, res) => {
  try {
    const { id } = req.params; 

    const commit = await Commit.findById(id).populate("files.file_id");
    if (!commit) return res.status(404).json({ message: "Commit nhi hain " });

    const dmp = new DiffMatchPatch();

    const diffsResult = [];

    for (const file of commit.files) {
      const prevVersion = await File.findOne({
        repo_id: commit.repo_id,
        file_path: file.file_path,
        latest_version: file.version - 1,
      });

      const oldContent = prevVersion ? prevVersion.latest_content : "";
      const newContent = file.content;

      const diffs = dmp.diff_main(oldContent, newContent);
      dmp.diff_cleanupSemantic(diffs);

      diffsResult.push({
        file_name: file.file_name,
        file_path: file.file_path,
        version: file.version,
        diff: dmp.diff_prettyHtml(diffs), // HTML version of diff
      });
    }

    return res.status(200).json({
      commit_id: commit._id,
      diffs: diffsResult,
    });
  } catch (err) {
    console.error("[COMMIT DIFF ERROR]", err);
    return res.status(500).json({ error: err.message });
  }
};
