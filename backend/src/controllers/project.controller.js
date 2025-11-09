import Project from "../models/project.model.js";

// =================
// Create Project
// =================

export const createProject = async (req, res) => {
  try {
    const { title, description, owner_id } = req.body;

    if (!title || !description || !owner_id) {
      console.error("[PROJECT][WARN] Missing fields:", {
        title,
        description,
        owner_id,
      });
      return res.status(400).json({ message: "add all fields" });
    }

    const newProject = new Project({
      title,
      description,
      owner_id,
    });

    await newProject.save();

    return res.status(201).json({
      message: "project created",
      project: newProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =================
// Update Project
// =================

export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project_id = req.params.id;

    const project = await Project.findById({ project_id });

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();

    return res
      .status(200)
      .json({ message: "Project Updated", project: project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =================
// Delete Project
// =================

export const deleteProject = async (req, res) => {
  try {
    const project_id = req.params.id;

    const project = await Project.findById({ project_id });

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    await Project.deleteOne({ _id: project_id });

    return res.status(200).json({ message: "Project Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// =================
// Get Project
// =================

export const getProject = async (req, res) => {
  try {
    const project_id = req.params.id;

    const project = await Project.findById({ project_id });

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    return res.status(200).json({ project: project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =================
// Get All Projects for User
// =================

export const getAllProjects = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const projects = await Project.find({ owner_id: owner_id });

    return res.status(200).json({ projects: projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// =================
// Add collaborator to Project
// =================

export const addCollaborator = async (req, res) => {
  try {
    const project_id = req.params.id;
    const { collaborator_id } = req.body;

    const project = await Project.findById({ project_id });

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    if (project.collaborators.includes(collaborator_id)) {
      return res
        .status(400)
        .json({ Error: "User is already a collaborator" });
    }

    project.collaborators.push(collaborator_id);
    await project.save();

    return res
      .status(200)
      .json({ message: "Collaborator Added", project: project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
