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

/*
Get Notifications for Students
*/
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};