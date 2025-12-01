import mongoose from "mongoose";

const { Schema } = mongoose;

const CommitFileSchema = new Schema(
  {
    file_id: {
      type: Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },

    file_name: {
      type: String,
      required: true,
    },

    file_path: {
      type: String,
      required: true,
    },

    // version of the file at the time of this commit
    version: {
      type: Number,
      required: true,
    },

    // full snapshot of the file content at this commit
    content: {
      type: String,
      required: true,
    },

    // optional diff/patch (e.g. DiffMatchPatch patch string)
    diff: {
      type: String,
      default: "",
    },
  },
  { _id: false } // prevent Mongoose from creating an _id for each sub-doc (optional)
);

const CommitSchema = new Schema(
  {
    repo_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    commit_title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    // array of changed file snapshots
    files: {
      type: [CommitFileSchema],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// useful indexes
CommitSchema.index({ repo_id: 1, createdAt: -1 });
CommitSchema.index({ user_id: 1 });
CommitSchema.index({ "files.file_id": 1 });

export default mongoose.model("Commit", CommitSchema);
