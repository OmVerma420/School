import Notification from "../models/Notification.js";

/*
Create Notification (Admin / Teacher)
*/
export const createNotification = async (req, res) => {
  try {
    const { title, message, type, targetRole } = req.body;

    const notification = await Notification.create({
      title,
      message,
      type,
      targetRole,
      createdBy: req.user.id,
    });

    res.json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create notification" });
  }
};


/* Get Notifications (UPDATED) */
export const getNotifications = async (req, res) => {
  try {
    // Fetch notifications targeted to their role (e.g., "student") OR "all"
    const notifications = await Notification.find({ 
        targetRole: { $in: [req.user.role, "all"] } 
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};