import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      default: "student",
    },
    // NEW FIELD ADDED HERE
    studentClass: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    fatherName: { 
        type: String 
    },
    motherName: { 
        type: String 
    },
    phone: { 
        type: String 
    },
    dob: { 
        type: String 
    },
    address: { 
        type: String 
    },
    isProfileComplete: { 
        type: Boolean, 
        default: false 
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
