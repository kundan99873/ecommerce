import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + uniqueSuffix + file.originalname);
  },
});
// const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext != ".jpeg" && ext !== ".png" && ext !== ".webp") {
    cb(new Error("unsupported file type : " + ext), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: 50 * 1024 * 1024,
  fileFilter: fileFilter,
});

export default upload;
