import mongoose from "mongoose";
const { Schema } = mongoose;

const CommitSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    changes: { type: Array, default: [] }, // list of changed files
    modified_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Commit = mongoose.model("Commit", CommitSchema);
export default Commit;
