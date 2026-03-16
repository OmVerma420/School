import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },

    motherName: {
      type: String,
    },

    classApplying: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admission", admissionSchema);