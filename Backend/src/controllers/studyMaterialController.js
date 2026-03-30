import StudyMaterial from "../models/StudyMaterial.js";

export const uploadMaterial = async (req, res) => {
  try {
    const { title, subject, description, targetClass } = req.body;

    const material = await StudyMaterial.create({
      title,
      subject,
      description,
      targetClass,
      fileUrl: req.file.path,
      uploadedBy: req.user.id,
    });

    res.json({
      success: true,
      material,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

/* Get Materials (UPDATED) */
export const getMaterials = async (req, res) => {
  try {
    // Filter by the student's class
    const materials = await StudyMaterial.find({ targetClass: req.user.studentClass })
      .sort({ createdAt: -1 });

    res.json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch materials" });
  }
};