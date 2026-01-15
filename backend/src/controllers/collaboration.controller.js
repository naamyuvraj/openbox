import Collaboration from "../models/collaboration.model.js";

class CollaborationController {
  // Save cursor position
  async saveCursor(req, res) {
    try {
      const { file_id, line, column } = req.body;
      const user_id = req.user.id;

      const coll = await Collaboration.findOneAndUpdate(
        { file_id, user_id },
        { line, column, last_active: Date.now() },
        { new: true, upsert: true }
      );
      res.status(200).json({ collaboration: coll });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get active cursors
  async getActiveCursors(req, res) {
    try {
      // 5 min timeout
      const activeThreshold = Date.now() - 5 * 60 * 1000;
      const cursors = await Collaboration.find({
        file_id: req.params.fileId,
        last_active: { $gte: new Date(activeThreshold) },
      }).populate("user_id", "name email");

      res.status(200).json({ cursors });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new CollaborationController();
