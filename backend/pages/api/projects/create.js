// pages/api/projects/create.js
import nc from "next-connect";
import multer from "multer";
import AdmZip from "adm-zip";
import File from "../../../models/file.model.js";
import Commit from "../../../models/commit.model.js";
import Project from "../../../models/repo.model.js";

// Multer memory storage so we can access req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Next.js API config to disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: placeholder — replace with your auth/session logic
async function getUserFromRequest(req) {
  // EXAMPLE: if you're using a session cookie or JWT, decode here.
  // Return an object with at least { id: "userId" } or null if unauthenticated.
  // Replace this with real code.
  return { id: "placeholder-user-id" };
}

// Create a next-connect handler so multer works nicely
const handler = nc({
  onError(err, req, res, next) {
    console.error("API ERROR:", err);
    res.status(500).end("Something went wrong.");
  },
  onNoMatch(req, res) {
    res.status(405).end("Method not allowed");
  },
});

// single field name: projectZip (frontend sends this)
handler.use(upload.single("projectZip"));

handler.post(async (req, res) => {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user_id = user.id;

    // optional repo metadata from form fields
    const repo_id = req.body.repo_id || null;
    const repo_name = req.body.repo_name || null;
    const repo_description = req.body.repo_description || null;
    const project_name = req.body.project_name || null;
    const description = req.body.description || null;
    const commit_title = req.body.commit_title || "Initial import";
    const message = req.body.message || "";

    let activeRepoId = repo_id;
    let newlyCreatedRepo = null;

    const deriveRepoName = () => {
      if (repo_name && repo_name.trim()) return repo_name.trim();
      if (project_name && project_name.trim()) return project_name.trim();
      if (req.file?.originalname) {
        return req.file.originalname.replace(/\.zip$/i, "").trim();
      }
      return "";
    };

    if (!activeRepoId) {
      const inferredName = deriveRepoName();

      if (!inferredName) {
        return res.status(400).json({
          message:
            "repo_id missing. Provide repo_name/project_name or upload a folder with a valid name.",
        });
      }

      newlyCreatedRepo = new Project({
        name: inferredName,
        description:
          repo_description ||
          description ||
          `Imported from ${req.file?.originalname || "folder upload"}`,
        user_id,
      });

      await newlyCreatedRepo.save();
      activeRepoId = newlyCreatedRepo._id.toString();
    }

    // Handle ZIP upload if present
    const commitFiles = [];

    if (req.file && req.file.buffer) {
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

        let file = await File.findOne({ repo_id: activeRepoId, file_path });

        if (!file) {
          file = new File({
            repo_id: activeRepoId,
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

    if (commitFiles.length === 0)
      return res
        .status(400)
        .json({ message: "No file changes or ZIP provided" });

    // Create commit
    const newCommit = new Commit({
      repo_id: activeRepoId,
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
      success: true,
      message: "Commit created successfully",
      commit: newCommit,
      repo: newlyCreatedRepo,
    });
  } catch (err) {
    console.error("[API CREATE PROJECT ERROR]", err);
    return res.status(500).json({ error: err.message });
  }
});

export default handler;
