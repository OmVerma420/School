import Assignment from "../models/Assignment.js";

/*
Create Assignment (Teacher)
*/
export const createAssignment = async (req, res) => {
  try {
    const { title, subject, description, dueDate, targetClass } = req.body;

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
      targetClass,
      createdBy: req.user.id,
    });

    res.json({
      success: true,
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create assignment" });
  }
};

/*
Get Assignments for Students
*/
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      assignments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};