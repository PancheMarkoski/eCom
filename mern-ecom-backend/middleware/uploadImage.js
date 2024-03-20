import multer from "multer";

// No need for fs, path, sharp, or fileURLToPath imports as we're not handling files locally

// Use memory storage to store files as buffers in memory
const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, // 1MB file size limit
});

// Simplified middleware without local file processing
export { uploadPhoto };
