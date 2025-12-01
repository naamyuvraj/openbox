import Project from "../models/repo.model.js";

import File from "../models/file.model.js";
import Commit from "../models/commit.model.js";

function buildFileTree(files) {
  const root = {};

  files.forEach((file) => {
    const parts = file.file_path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {
          __isFile: index === parts.length - 1,
          file: index === parts.length - 1 ? file : null,
          children: {},
        };
      }
      current = current[part].children;
    });
  });

  return root;
}


export const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    const files = await File.find({ repo_id: id }).sort({ file_path: 1 });

    // Tree formatted
    const fileTree = buildFileTree(files);

    const commits = await Commit.find({ repo_id: id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      project,
      files,
      fileTree, // NEW
      commits,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==============================
// Create a new project / repo
// ==============================
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user_id = req.user.id; // from JWT

    if (!name) {
      return res.status(400).json({ message: "Please provide a project name" });
    }

    const newProject = new Project({
      name,
      description: description || "",
      user_id,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    console.error("[CREATE PROJECT ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};


// ==============================
// Get all projects of the user
// ==============================
export const getUserProjects = async (req, res) => {
  try {
    const user_id = req.user.id;
    const projects = await Project.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    console.error("[GET USER PROJECTS ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};

// ==============================
// Get a single project by ID
// ==============================
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ project });
  } catch (err) {
    console.error("[GET PROJECT ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};


export const updateProjectDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updated = await Project.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json({
      message: "Description updated",
      project: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==============================
// Add collaborator to project
// ==============================
export const addCollaborator = async (req, res) => {
  try {
    const { collaboratorId } = req.body;
    const projectId = req.params.id;

    if (!collaboratorId)
      return res
        .status(400)
        .json({ message: "Please provide collaborator ID" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // avoid duplicates
    if (!project.collaborators.includes(collaboratorId)) {
      project.collaborators.push(collaboratorId);
      await project.save();
    }

    res.status(200).json({
      message: "Collaborator added successfully",
      project,
    });
  } catch (err) {
    console.error("[ADD COLLABORATOR ERROR]", err);
    res.status(500).json({ error: err.message });
  }
};

