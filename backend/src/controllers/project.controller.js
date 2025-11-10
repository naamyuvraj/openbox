import Project from "../models/project.model.js";

// ==================
// Create Project  
// ==================
export const createProject = async (req, res) => {
  try {
    const { title, description, owner_id } = req.body;

    if (!title || !description || !owner_id) {
      console.warn("[PROJECT][WARN] Missing fields:", { title, description, owner_id });
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newProject = new Project({
      title,
      description,
      owner_id,
    });

    await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===============
// Update Project
// ===============

export const updateProject = async (req, res) => {
  try {
    const project_id = req.params.id;
    const { title, description } = req.body;

    const project = await Project.findById(project_id);

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();

    return res.status(200).json({
      message: "Project updated",
      project,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================
// Delete Project
// ================
export const deleteProject = async (req, res) => {
  try {
    const project_id = req.params.id;

    const project = await Project.findById(project_id);

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    await Project.deleteOne({ _id: project_id });

    return res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==============================
// Get Single Project (by Id)
// ==============================

export const getProject = async (req, res) => {
  try {
    const project_id = req.params.id;

    const project = await Project.findById(project_id);

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    return res.status(200).json({ project });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===========================
// Get All Projects of User 
// ===========================
export const getAllProjects = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const projects = await Project.find({ owner_id });

    return res.status(200).json({ projects });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ======================
// Add Collaborator 
// ======================

export const addCollaborator = async (req, res) => {
  try {
    const project_id = req.params.id;
    const { collaborator_id } = req.body;

    const project = await Project.findById(project_id);

    if (!project) {
      return res.status(404).json({ Error: "Project Not Found" });
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    if (project.collaborators.includes(collaborator_id)) {
      return res.status(400).json({ Error: "User is already a collaborator" });
    }

    project.collaborators.push(collaborator_id);
    await project.save();

    return res.status(200).json({
      message: "Collaborator added",
      project,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =========================
// remove Collaborator
// =========================

export const removeCollaborator = async (req, res) => {
  try {
    const project_id = req.params.id;
    const { collaborator_id } = req.body;

    const project = await Project.findById(project_id);

    if (!project){
      return res.status(404).json({message:"Project nhi hain"})
    }

    if (project.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ Error: "Access Denied" });
    }

    if (!project.collaborators.includes(collaborator_id)) {
      return res.status(400).json({ Error: "User is not a collaborator" });
    }

    project.collaborators = project.collaborators.filter(
      (id) => id.toString() !== collaborator_id
    );

    await project.save();

    return res.status(200).json({
      message: "Collaborator removed",
      project,
    });



  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}