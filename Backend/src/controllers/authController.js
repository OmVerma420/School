import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    await user.save();

    console.log("OTP:", otp);

    res.json({
      success: true,
      message: "OTP sent",
    });

  } catch (error) {
  console.error("LOGIN ERROR:", error);
  res.status(500).json({
    message: "Server error",
    error: error.message
  });
}
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // clear OTP
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};