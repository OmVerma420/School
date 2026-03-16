import Message from "../models/Message.js";

/*
Teacher / Admin sends message
*/
export const createMessage = async (req, res) => {
  try {
    const { title, message, senderRole, targetClass } = req.body;

    const newMessage = await Message.create({
      title,
      message,
      senderRole,
      targetClass,
      createdBy: req.user.id,
    });

    res.json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

/*
Students fetch messages
*/
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};