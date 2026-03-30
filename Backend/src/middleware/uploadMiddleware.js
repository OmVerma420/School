import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "school-management",
    resource_type: "auto", 
  },
});

// Add the strict 5MB limit right here!
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB (5 * 1024 KB * 1024 Bytes)
});

export default upload;