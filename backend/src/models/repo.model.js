import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

// Safety: try to drop old slug_1 index once on startup (ignore if it doesn't exist)
mongoose.connection.once("open", async () => {
  try {
    await Project.collection.dropIndex("slug_1");
    console.log("Dropped legacy index slug_1 from projects collection");
  } catch (err) {
    // Ignore "index not found" and namespace errors
    if (err.code !== 27 && err.codeName !== "IndexNotFound") {
      console.warn("Could not drop legacy slug_1 index:", err.message);
    }
  }
});

export default Project;
