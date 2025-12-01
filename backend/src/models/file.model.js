import mongoose from "mongoose";
const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    repo_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    file_name: {
      type: String,
      required: true,
      trim: true,
    },

    file_path: {
      type: String,
      required: true,
      trim: true,
    },

    // Latest (current) content of the file
    latest_content: {
      type: String,
      default: "",
    },

    // Latest version number for this file
    latest_version: {
      type: Number,
      default: 1,
      min: 1,
    },

    // The commit that produced this latest version
    commit_id: {
      type: Schema.Types.ObjectId,
      ref: "Commit",
      default: null,
      index: true,
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ensure unique file path per repo
FileSchema.index({ repo_id: 1, file_path: 1 }, { unique: true });

// optional: helpful indexes for common queries
FileSchema.index({ repo_id: 1, latest_version: -1 });
FileSchema.index({ user_id: 1, updatedAt: -1 });

export default mongoose.model("File", FileSchema);
