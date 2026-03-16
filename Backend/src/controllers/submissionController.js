import AssignmentSubmission from "../models/AssignmentSubmission.js";

/*
Student submits assignment
*/
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, remarks } = req.body;

    const submission = await AssignmentSubmission.create({
      assignment: assignmentId,
      student: req.user.id,
      fileUrl: req.file.path,
      remarks,
    });

    res.json({
      success: true,
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: "Submission failed" });
  }
};

/*
Student view own submissions
*/
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await AssignmentSubmission.find({
      student: req.user.id,
    })
      .populate("assignment")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};