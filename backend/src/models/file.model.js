import mongoose from "mongoose";
const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    file_name: {
      type: String,
      required: true
    },

    path: {
      type: String,
      required: true
    },

    // only latest version content stored here
    content: {
      type: String,
      default: ""
    },

    // NEW ➤ keep track of latest version number
    latest_version: {
      type: Number,
      default: 1
    },

    // NEW ➤ link to last commit that updated this file
    last_commit_id: {
      type: Schema.Types.ObjectId,
      ref: "Commit",
      default: null
    },

    modified_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    modified_at: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
export default File;
