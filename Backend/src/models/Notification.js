import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["school", "teacher"],
      default: "school",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    targetRole: {
      type: String,
      enum: ["student", "faculty", "all"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);