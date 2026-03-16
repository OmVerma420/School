import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    senderRole: {
      type: String,
      enum: ["teacher", "school"],
      default: "teacher",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    targetClass: {
      type: String,
      default: "all",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);