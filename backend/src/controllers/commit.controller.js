import File from "../models/file.model.js";
import Commit from "../models/commit.model.js";
import AdmZip from "adm-zip";

// ==============================
// Commit changes / upload ZIP
// ==============================
export const commitChanges = async (req, res) => {
  try {
    const { repo_id, changes, commit_title, message } = req.body;
    const user_id = req.user.id;

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

        let file = await File.findOne({ repo_id, file_path });

        if (!file) {
          file = new File({
            repo_id,
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
        let file = await File.findOne({ repo_id, file_path: c.file_path });

        if (!file) {
          file = new File({
            repo_id,
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
      repo_id,
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


