import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
        files: [{ type: String }],
        changes: [{ type: String }],
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
