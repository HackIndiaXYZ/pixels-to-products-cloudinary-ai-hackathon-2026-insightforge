const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { analyzeCreative } = require("../services/aiService");
<<<<<<< HEAD
=======
const {
  saveCreative,
  getAllCreatives,
} = require("../services/creativeStore");
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/upload", upload.single("creative"), async (req, res) => {
  try {
<<<<<<< HEAD
=======
    console.log("=================================");
    console.log("CREATIVE UPLOAD STARTED");
    console.log("=================================");

>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

<<<<<<< HEAD
    // 1. Upload image to Cloudinary
=======
    console.log("File:", req.file.originalname);
    console.log("Size:", req.file.size, "bytes");
    console.log("MIME:", req.file.mimetype);

    // ==========================================
    // 1. UPLOAD IMAGE TO CLOUDINARY
    // ==========================================

    console.log("Uploading image to Cloudinary...");

>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "insightforge/creatives",
          resource_type: "image",
<<<<<<< HEAD
        },
        (error, result) => {
          if (error) {
=======
          timeout: 120000,
        },
        (error, result) => {
          if (error) {
            console.error("CLOUDINARY UPLOAD ERROR:");
            console.error(error);
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

<<<<<<< HEAD
      stream.end(req.file.buffer);
    });

    console.log("Cloudinary upload successful");

    // 2. Send Cloudinary image to Gemini
=======
      stream.on("error", (error) => {
        console.error("CLOUDINARY STREAM ERROR:");
        console.error(error);
        reject(error);
      });

      stream.end(req.file.buffer);
    });

    console.log("Cloudinary upload successful!");
    console.log("Cloudinary URL:", cloudinaryResult.secure_url);

    // ==========================================
    // 2. SEND CLOUDINARY IMAGE TO GEMINI
    // ==========================================

    console.log("Sending Cloudinary image to Gemini...");

>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
    const analysis = await analyzeCreative(
      cloudinaryResult.secure_url
    );

<<<<<<< HEAD
    console.log("AI analysis successful");

    // 3. Send everything back to React
=======
    console.log("Gemini analysis successful!");

    // ==========================================
    // 3. SAVE CREATIVE
    // ==========================================

    saveCreative(req.file.originalname, {
      cloudinaryUrl: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      analysis: analysis,
    });

    console.log("Creative analysis saved!");

    // ==========================================
    // 4. SEND RESPONSE TO FRONTEND
    // ==========================================

>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
    res.status(201).json({
      message: "Creative analyzed successfully",
      url: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      analysis: analysis,
    });

  } catch (error) {
<<<<<<< HEAD
    console.error("Creative analysis error:", error);

    res.status(500).json({
      message: "Creative analysis failed",
      error: error.message,
=======
    console.error("=================================");
    console.error("CREATIVE ANALYSIS ERROR");
    console.error("=================================");
    console.error("Message:", error?.message);
    console.error("HTTP Code:", error?.http_code);
    console.error("Name:", error?.name);
    console.error("Full Error:", error);
    console.error("=================================");

    res.status(500).json({
      message: "Creative analysis failed",
      error: error?.message || "Unknown error",
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
    });
  }
});

<<<<<<< HEAD
=======
router.get("/stored", (req, res) => {
  res.json({
    count: getAllCreatives().length,
    creatives: getAllCreatives(),
  });
});

>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
module.exports = router;