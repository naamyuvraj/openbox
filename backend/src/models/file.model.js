import mongoose from "mongoose";
const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    file_name: { type: String, required: true }, 
    path: { type: String, required: true },
    content: { type: String, default: "" },
    modified_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    modified_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
export default File;
