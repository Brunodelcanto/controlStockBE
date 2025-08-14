import multer from "multer";
import path from "path";
import fs from "fs";

// En producción, usar /tmp que es escribible en Render
const uploadDir = process.env.NODE_ENV === 'production' 
  ? '/tmp/uploads' 
  : path.join(__dirname, "../../uploads");

console.log("📁 Upload directory:", uploadDir);

if (!fs.existsSync(uploadDir)) {
  console.log("📁 Creating uploads directory...");
  fs.mkdirSync(uploadDir, { recursive: true });
} else {
  console.log("📁 Uploads directory already exists");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📂 Setting destination to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log("📝 Generated filename:", filename);
    cb(null, filename);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    console.log("🔍 File filter - mimetype:", file.mimetype);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

export default upload;

