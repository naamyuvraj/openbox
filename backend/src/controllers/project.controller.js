import Project from "../models/repo.model.js";
import File from "../models/file.model.js";
import Commit from "../models/commit.model.js";

// Helper to build tree
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

// Project logic class
class ProjectController {
  // Delete project safely
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.user.id;
      const project = await Project.findOne({ _id: id, user_id });
      if (!project) return res.status(404).json({ message: "Not found" });
      
      await File.deleteMany({ repo_id: id });
      await Commit.deleteMany({ repo_id: id });
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get single project details
  async getProjectDetails(req, res) {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: "Not found" });
      const files = await File.find({ repo_id: req.params.id }).sort({ file_path: 1 });
      const fileTree = buildFileTree(files);
      const commits = await Commit.find({ repo_id: req.params.id }).sort({ createdAt: -1 }).limit(50);
      res.status(200).json({ project, files, fileTree, commits });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Create new project
  async createProject(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) return res.status(400).json({ message: "Need name" });
      const newProject = new Project({ name, description: description || "", user_id: req.user.id });
      await newProject.save();
      res.status(201).json({ message: "Created", project: newProject });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get user projects
  async getUserProjects(req, res) {
    try {
      const projects = await Project.find({ user_id: req.user.id }).sort({ createdAt: -1 });
      res.status(200).json({ projects });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update description
  async updateProjectDescription(req, res) {
    try {
      const updated = await Project.findByIdAndUpdate(req.params.id, { description: req.body.description }, { new: true });
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.status(200).json({ message: "Updated", project: updated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Add collaborator
  async addCollaborator(req, res) {
    try {
      const { collaboratorId } = req.body;
      if (!collaboratorId) return res.status(400).json({ message: "Need ID" });
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: "Not found" });
      if (!project.collaborators.includes(collaboratorId)) {
        project.collaborators.push(collaboratorId);
        await project.save();
      }
      res.status(200).json({ message: "Added", project });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new ProjectController();
