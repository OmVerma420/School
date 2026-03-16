import express from "express";
import { login, verifyOtp } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import{createAdmission,getMyAdmissions}from '../controllers/admissionController.js';
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createAssignment,
  getAssignments,
} from "../controllers/assignmentController.js";
import {
  createClcRequest,
  getMyClcRequests,
} from "../controllers/clcController.js";
import {
  createMessage,
  getMessages,
} from "../controllers/messageController.js";
import {
  createNotification,
  getNotifications,
} from "../controllers/notificationController.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadMaterial,
  getMaterials,
} from "../controllers/studyMaterialController.js";
import {
  submitAssignment,
  getMySubmissions,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

router.post("/", authMiddleware, createAdmission);
router.get("/my", authMiddleware, getMyAdmissions);

router.get("/", authMiddleware, getAssignments);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("faculty"),
  createAssignment
);

router.post("/", authMiddleware, createClcRequest);
router.get("/my", authMiddleware, getMyClcRequests);

router.get("/", authMiddleware, getMessages);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("faculty", "admin"),
  createMessage
);

router.get("/", authMiddleware, getNotifications);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "faculty"),
  createNotification
);

router.get("/", authMiddleware, getMaterials);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("faculty"),
  upload.single("file"),
  uploadMaterial
);

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  submitAssignment
);
router.get("/my", authMiddleware, getMySubmissions);

export default router;