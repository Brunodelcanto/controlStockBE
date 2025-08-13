import { Request, Response } from "express";
import express from "express";
import upload from "../../middleware/upload";
import cloudinary from "../../config/cloudinary";
import fs from "fs";

const router = express.Router();

router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "SET" : "MISSING",
      api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING"
    });

    if (!req.file) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }
    
    // Configurar explícitamente antes de cada upload
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "productos",
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Imagen subida con éxito",
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    res.status(500).json({ error: "Error subiendo imagen a Cloudinary", details: error });
  }
});

export default router;
