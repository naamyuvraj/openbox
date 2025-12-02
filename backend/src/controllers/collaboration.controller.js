import Collaboration from "../models/collaboration.model.js";
import Project from "../models/repo.model.js";

export const inviteCollaborator = async (req, res) => {
  try {
    const { project_id, inviteeEmail } = req.body;

    // JWT gives: req.user.id, req.user.email, req.user.username (NOT req.user._id)
    const inviter_id = req.user.id;
    const inviter_name = req.user.name || req.user.username || req.user.email;

    if (!project_id || !inviteeEmail) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    // 1. Validate project
    const project = await Project.findById(project_id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. Check project owner
    if (project.user_id.toString() !== inviter_id.toString()) {
      return res.status(403).json({
        message: "Only project owner can invite collaborators",
      });
    }

    // 3. Check for existing invite
    const existing = await Collaboration.findOne({
      project_id,
      inviteeEmail,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ message: "Invite already pending" });
    }

    // 4. Create the collaboration invite
    const invite = await Collaboration.create({
      project_id,
      project_name: project.name,
      inviteeEmail,
      inviter_id,
      inviter_name, // IMPORTANT FIX
      status: "pending",
    });

    return res.status(201).json({
      message: "Collaboration invite sent.",
      invite,
    });

  } catch (error) {
    console.error("Invite collaborator error:", error);
    return res.status(500).json({ message: error.message });
  }
};
