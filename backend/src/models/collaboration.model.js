import mongoose from "mongoose";
const { Schema } = mongoose;

const CollaborationSchema = new Schema(
  {
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    project_name: { type: String, required: true },
    inviter_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    inviter_name: { type: String, required: true },
    inviteeEmail: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const Collaboration = mongoose.model("Collaboration", CollaborationSchema);
export default Collaboration;
