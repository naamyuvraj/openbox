import mongoose from "mongoose";
const { Schema } = mongoose;


const ProjectSchema = new Schema(
  {
    // Repo ka title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Title se generate hone wala URL-friendly slug
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    // Short description (repo ka overview)
    description: {
      type: String,
      required: true,
    },

    // Repo ka owner (User reference)
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Collaborators list (team members)
    collaborators: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },

    // Files ka metadata (S3/Supabase me store hota hai)
    files: {
      type: [
        {
          path: String, // jaise: "src/index.js"
          url: String,  // uploaded file ka public URL
          size: Number,
          type: String, // "file" ya "folder"
        },
      ],
      default: [],
    },

    // Minimal commits / changes history
    changes: {
      type: [
        {
          message: String,
          commit_id: { type: Schema.Types.ObjectId, ref: "Commit" },
          timestamp: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

// -------------------------------------------------------------
// Slug auto-generate ho jata hai title se 
// -------------------------------------------------------------

ProjectSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
