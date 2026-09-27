const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { analyzeCreative } = require("../services/aiService");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/upload", upload.single("creative"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    // 1. Upload image to Cloudinary
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "insightforge/creatives",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    console.log("Cloudinary upload successful");

    // 2. Send Cloudinary image to Gemini
    const analysis = await analyzeCreative(
      cloudinaryResult.secure_url
    );

    console.log("AI analysis successful");

    // 3. Send everything back to React
    res.status(201).json({
      message: "Creative analyzed successfully",
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      analysis: analysis,
    });

  } catch (error) {
    console.error("Creative analysis error:", error);

    res.status(500).json({
      message: "Creative analysis failed",
      error: error.message,
    });
  }
});

module.exports = router;