import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// --- FOR FACULTY ---
// This gives the teacher the names of students in a class
export const getStudentsByClass = async (req, res) => {
  try {
    const { className } = req.params;
    const students = await User.find({ role: "student", studentClass: className })
      .select("name _id")
      .sort({ name: 1 });
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student list" });
  }
};

// --- FOR STUDENTS ---
// This calculates the math for a single student's dashboard
export const getStudentAttendanceStats = async (req, res) => {
  try {
    const studentId = req.user.id; // Logged in student's ID from token

    const total = await Attendance.countDocuments({ student: studentId });
    const present = await Attendance.countDocuments({ student: studentId, status: "Present" });
    const absent = await Attendance.countDocuments({ student: studentId, status: "Absent" });

    res.json({
      success: true,
      stats: {
        total,
        present,
        absent,
        percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating your stats" });
  }
};

// 2. Save/Update Bulk Attendance
export const markAttendance = async (req, res) => {
  try {
    const { attendanceData, date, studentClass } = req.body;
    
    // attendanceData is an array: [{ studentId: "...", status: "Present" }]
    const promises = attendanceData.map((item) => {
      return Attendance.findOneAndUpdate(
        { student: item.studentId, date: new Date(date) },
        { 
          status: item.status, 
          studentClass, 
          markedBy: req.user.id 
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(promises);
    res.json({ success: true, message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save attendance" });
  }
};