import Assignment from "../models/Assignment.js";

/*
  Create Assignment (Faculty/Admin only)
*/
export const createAssignment = async (req, res) => {
  try {
    // Notice: fileUrl is removed from req.body!
    const { title, subject, description, dueDate, targetClass } = req.body;

    // 1. Catch the Cloudinary URL from the uploaded file (if attached)
    let fileUrl = "";
    if (req.file && req.file.path) {
      fileUrl = req.file.path; 
    }

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
      targetClass,
      fileUrl, // Save the newly generated Cloudinary link
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    console.error("Create assignment error:", error);
    
    // 2. Catch the 5MB limit error directly from Multer
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ 
        success: false, 
        message: "File is too heavy! Maximum size is 5MB." 
      });
    }

    res.status(500).json({ success: false, message: "Failed to create assignment" });
  }
};

/*
  Get Assignments
*/
export const getAssignments = async (req, res) => {
  try {
    let filter = {};
    
    // If the logged-in user is a student, only show assignments for their class.
    if (req.user.role === "student") {
      filter.targetClass = req.user.studentClass;
    }

    const assignments = await Assignment.find(filter)
      .populate("createdBy", "name") // Pulls the teacher's name
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, assignments });
  } catch (error) {
    console.error("Get assignments error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch assignments" });
  }
};