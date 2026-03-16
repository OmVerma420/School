import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    remarks: String,

    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AssignmentSubmission", submissionSchema);