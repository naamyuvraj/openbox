import File from "../models/file.model.js";
import Commit from "../models/commit.model.js";

// Get single file
export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    return res.status(200).json({ file });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get file history
export const getFileHistory = async (req, res) => {
  try {
    const commits = await Commit.find({ "files.file_id": req.params.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ commits });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
