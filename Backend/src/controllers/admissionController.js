import Admission from "../models/Admission.js";

/*
Submit Admission Form
*/
export const createAdmission = async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      classApplying,
      dob,
      phone,
      address,
    } = req.body;

    const admission = await Admission.create({
      studentName,
      fatherName,
      motherName,
      classApplying,
      dob,
      phone,
      address,
      createdBy: req.user.id,
    });

    res.json({
      success: true,
      admission,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit admission form" });
  }
};

/*
Student view submitted admission forms
*/
export const getMyAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      admissions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admissions" });
  }
};

// Admin view ALL admissions
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json({ success: true, admissions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all admissions" });
  }
};

// Admin update status (Approve/Reject)
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    const admission = await Admission.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json({ success: true, admission });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};