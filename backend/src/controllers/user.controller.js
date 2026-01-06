import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// User controller class
class UserController {
  // Get user profile
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password -_id -__v -googleId");
      if (!user) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update bio or avatar
  async updateBioAvatar(req, res) {
    try {
      const { bio, avatarUrl } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "Not found" });

      user.bio = bio || user.bio;
      user.avatarUrl = avatarUrl || user.avatarUrl;
      await user.save();
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Change password
  async changePassword(req, res) {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "Password too short" });
      }

      const user = await User.findById(req.user.id).select("+password");
      if (!user) return res.status(404).json({ message: "Not found" });

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.status(200).json({ message: "Updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

// Export basic instance
export default new UserController();
