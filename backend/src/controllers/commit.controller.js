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

    const commitFiles = [];
    const dmp = new DiffMatchPatch();

    // ======== Handle ZIP upload ========
    if (req.file) {
      const zip = new AdmZip(req.file.buffer);
      const zipEntries = zip.getEntries();

      for (const entry of zipEntries) {
        if (entry.isDirectory) continue;
        if (
          entry.entryName.startsWith("__MACOSX/") ||
          entry.name.startsWith("._")
        )
          continue;

        const content = entry.getData().toString("utf-8");
        const file_path = entry.entryName;
        const file_name = entry.name;

        let file = await File.findOne({ repo_id: activeRepoId, file_path });
        let oldContent = "";

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
          oldContent = file.latest_content;
          file.latest_content = content;
          file.latest_version += 1;
          file.user_id = user_id;
          await file.save();
        }

        const diffs = dmp.diff_main(oldContent, content);
        dmp.diff_cleanupSemantic(diffs);
        const diffHTML = oldContent === "" ? "" : dmp.diff_prettyHtml(diffs);

        commitFiles.push({
          file_id: file._id,
          file_name: file.file_name,
          file_path: file.file_path,
          version: file.latest_version,
          content: file.latest_content,
          diff: diffHTML, // Store diff directly
        });
      }
    }

    // ======== Handle manual changes array ========
    if (changes && changes.length > 0) {
      for (const c of changes) {
        let file = await File.findOne({
          repo_id: activeRepoId,
          file_path: c.file_path,
        });

        let oldContent = "";

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
          oldContent = file.latest_content;
          file.latest_content = c.content;
          file.latest_version += 1;
          file.user_id = user_id;
          await file.save();
        }

        const diffs = dmp.diff_main(oldContent, c.content);
        dmp.diff_cleanupSemantic(diffs);
        const diffHTML = oldContent === "" ? "" : dmp.diff_prettyHtml(diffs);

        commitFiles.push({
          file_id: file._id,
          file_name: file.file_name,
          file_path: file.file_path,
          version: file.latest_version,
          content: file.latest_content,
          diff: diffHTML,
        });
      }
    }

    if (commitFiles.length === 0)
      return res
        .status(400)
        .json({ message: "No file changes or ZIP provided" });

    // ======== Create commit ========
    const newCommit = new Commit({
      repo_id: activeRepoId,
      user_id,
      commit_title: commit_title || "Updated files",
      message: message || "",
      files: commitFiles, // already has diff
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




export const commitChangesFromZip = async (req, res) => {
  try {
    const user_id = req.user.id;
    const zipFile = req.file;

    if (!zipFile) {
      return res.status(400).json({ message: "ZIP file missing" });
    }

    const zip = new AdmZip(zipFile.buffer);
    const entries = zip.getEntries();

    if (!entries.length) {
      return res.status(400).json({ message: "ZIP is empty" });
    }

    // Determine project name
    let projectName = req.body.project_name;
    if (!projectName || projectName.trim().length === 0) {
      projectName = zipFile.originalname.replace(/\.zip$/i, "");
    }
    projectName = projectName.trim();

    // Create project
    const project = new Project({
      name: projectName,
      description: req.body.description || "Imported project",
      user_id,
    });
    await project.save();

    const commitFiles = [];
    const dmp = new DiffMatchPatch();

    // Process files
    for (const entry of entries) {
      if (entry.isDirectory) continue;
      if (
        entry.entryName.startsWith("__MACOSX/") ||
        entry.name.startsWith("._")
      )
        continue;

      const content = entry.getData().toString("utf-8");

      // Save file
      const file = new File({
        repo_id: project._id,
        user_id,
        file_name: entry.name,
        file_path: entry.entryName,
        latest_content: content,
        latest_version: 1,
      });
      await file.save();

      // Compute diff (empty for initial commit)
      const diffHTML = "";

      commitFiles.push({
        file_id: file._id,
        file_name: file.file_name,
        file_path: file.file_path,
        version: file.latest_version,
        content: file.latest_content,
        diff: diffHTML,
      });
    }

    // Create commit with diffs
    const commit = new Commit({
      repo_id: project._id,
      user_id,
      commit_title: "Initial import",
      message: "",
      files: commitFiles, // now contains diff field
    });
    await commit.save();

    // Associate commit_id with files
    for (const f of commitFiles) {
      await File.findByIdAndUpdate(f.file_id, { commit_id: commit._id });
    }

    return res.status(201).json({
      message: "Project imported successfully",
      project,
      commit,
    });
  } catch (err) {
    console.error("[ZIP UPLOAD ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};

export const getDiffBetweenVersions = async (req, res) => {
  try {
    const { repoId, file_path, fromVersion, toVersion } = req.query;

    if (!repoId || !file_path || !fromVersion || !toVersion) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const fromVer = parseInt(fromVersion);
    const toVer = parseInt(toVersion);

    // Find commits containing the file at the specified versions
    const fromCommit = await Commit.findOne({
      repo_id: repoId,
      "files.file_path": file_path,
      "files.version": fromVer,
    });

    const toCommit = await Commit.findOne({
      repo_id: repoId,
      "files.file_path": file_path,
      "files.version": toVer,
    });

    if (!fromCommit || !toCommit) {
      return res.status(404).json({ message: "File versions not found" });
    }

    const fromFile = fromCommit.files.find((f) => f.file_path === file_path);
    const toFile = toCommit.files.find((f) => f.file_path === file_path);

    const dmp = new DiffMatchPatch();
    const diffs = dmp.diff_main(fromFile.content, toFile.content);
    dmp.diff_cleanupSemantic(diffs);

    const diffHTML = dmp.diff_prettyHtml(diffs);

    return res.status(200).json({
      file_path,
      fromVersion: fromVer,
      toVersion: toVer,
      diff: diffHTML,
    });
  } catch (err) {
    console.error("[DIFF ERROR]", err);
    return res.status(500).json({ error: err.message });
  }
};
