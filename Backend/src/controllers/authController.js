import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js"; // Import the mailer

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, studentClass } = req.body;

    if (!name || !email || !password || !studentClass) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP during registration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      studentClass: studentClass,
      otp, // Save OTP to DB
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });

    // Send the email
    const message = `Welcome to the School App! Your verification OTP is: ${otp}. It will expire in 5 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "Verify Your Account",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to email.",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send the email
    const message = `Your login OTP is: ${otp}. It will expire in 5 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "Login OTP Verification",
      message,
    });

    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/*
Login Step 2: Verify OTP & Issue JWT
*/
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

    // create JWT (Includes studentClass for data filtering)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        studentClass: user.studentClass,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
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
        email: user.email, 
        studentClass: user.studentClass,
        fatherName: user.fatherName,
        motherName: user.motherName,
        phone: user.phone,
        dob: user.dob,
        address: user.address,
        isProfileComplete: user.isProfileComplete,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

export const completeProfile = async (req, res) => {
  try {
    const { fatherName, motherName, phone, dob, address } = req.body;

    // Find the logged-in user and update their document
    // req.user.id comes from your JWT authentication middleware
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fatherName, motherName, phone, dob, address, isProfileComplete: true },
      { new: true }, // Return the updated user
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
