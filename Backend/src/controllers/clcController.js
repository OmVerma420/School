import ClcRequest from "../models/ClcRequest.js";

/*
Student creates CLC request
*/
export const createClcRequest = async (req, res) => {
  try {
    const { reason, lastDate } = req.body;

    const request = await ClcRequest.create({
      student: req.user.id,
      reason,
      lastDate,
    });

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create request" });
  }
};

/*
Student view own CLC requests
*/
export const getMyClcRequests = async (req, res) => {
  try {
    const requests = await ClcRequest.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};