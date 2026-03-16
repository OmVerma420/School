import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
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

    fileUrl: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    targetClass: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudyMaterial", studyMaterialSchema);