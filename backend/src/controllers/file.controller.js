import File from "../models/file.model.js";
import Commit from "../models/commit.model.js";
import AdmZip from "adm-zip";

// uplading using zip
export const uploadFolder = async (req, res) => {
  try {
    const { repo_id } = req.body;
    const user_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No ZIP file uploaded" });
    }

    const zipBuffer = req.file.buffer;
    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();

    if (zipEntries.length === 0) {
      return res.status(400).json({ message: "ZIP file is empty" });
    }

    const fileDocs = [];
    const commitFiles = [];

    for (const entry of zipEntries) {
      if (entry.isDirectory) continue;

      const content = entry.getData().toString("utf-8");
      const file_path = entry.entryName;
      const file_name = entry.name;

      const newFile = new File({
        repo_id,
        user_id,
        file_name,
        file_path,
        latest_content: content,
        latest_version: 1,
      });

      await newFile.save();
      fileDocs.push(newFile);

      commitFiles.push({
        file_id: newFile._id,
        file_name: newFile.file_name,
        file_path: newFile.file_path,
        version: newFile.latest_version,
        content: newFile.latest_content,
      });
    }

    //  initial commit
    const newCommit = new Commit({
      repo_id,
      user_id,
      commit_title: "Initial commit",
      message: "Uploaded initial folder",
      files: commitFiles,
    });

    await newCommit.save();

    // poitns to that commit 
    for (const file of fileDocs) {
      file.commit_id = newCommit._id;
      await file.save();
    }

    return res.status(201).json({
      message: "Folder uploaded and initial commit created",
      files: fileDocs,
      commit: newCommit,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
