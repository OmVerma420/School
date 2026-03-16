import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    description: String,

    dueDate: {
      type: Date,
      required: true,
    },

    fileUrl: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    targetClass: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Assignment", assignmentSchema);