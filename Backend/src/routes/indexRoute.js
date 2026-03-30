import express from "express";
import { register, login, verifyOtp } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import { createAdmission, getMyAdmissions } from "../controllers/admissionController.js";
import { createAssignment, getAssignments } from "../controllers/assignmentController.js";
import { createClcRequest, getMyClcRequests } from "../controllers/clcController.js";
import { createNotification, getNotifications } from "../controllers/notificationController.js";
import { uploadMaterial, getMaterials } from "../controllers/studyMaterialController.js";

import { completeProfile } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ================= AUTH ================= */
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/verify-otp", verifyOtp);
router.put('/auth/complete-profile', authMiddleware, completeProfile);

/* ================= ADMISSIONS ================= */
router.post("/admissions", authMiddleware, createAdmission);
router.get("/admissions/my", authMiddleware, getMyAdmissions);

/* ================= ASSIGNMENTS ================= */
router.get("/assignments", authMiddleware, getAssignments);

// Create Assignment (Faculty Only)
router.post(
  "/assignments",
  authMiddleware,                 // 1. Are they logged in?
  roleMiddleware("faculty", "admin"), // 2. Are they a teacher/admin?
  upload.single("file"),          // 3. Catch and upload the 5MB file!
  createAssignment                // 4. Save to MongoDB
);

/* ================= CLC REQUEST ================= */
router.post("/clc", authMiddleware, createClcRequest);
router.get("/clc/my", authMiddleware, getMyClcRequests);

/* ================= NOTIFICATIONS ================= */
router.get("/notifications", authMiddleware, getNotifications);
router.post(
  "/notifications",
  authMiddleware,
  roleMiddleware("admin", "faculty"),
  createNotification
);

/* ================= STUDY MATERIAL ================= */
router.get("/study-material", authMiddleware, getMaterials);
router.post(
  "/study-material",
  authMiddleware,
  roleMiddleware("faculty"),
  upload.single("file"),
  uploadMaterial
);



export default router;