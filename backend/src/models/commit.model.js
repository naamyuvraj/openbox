import mongoose from "mongoose";
const { Schema } = mongoose;

const CommitSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    commit_title: { type: String, required: true },
    message: { type: String, default: "" },

    // List of changed files in this commit
    changes: [
      {
        file_id: { type: Schema.Types.ObjectId, ref: "File", required: true },

        version: { type: Number, required: true },

        old_content: { type: String, required: true },
        new_content: { type: String, required: true },

        diff: { type: String, default: "" }
      }
    ],

    created_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Commit = mongoose.model("Commit", CommitSchema);
export default Commit;
