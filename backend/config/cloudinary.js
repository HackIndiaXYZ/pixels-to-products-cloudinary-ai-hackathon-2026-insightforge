const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
<<<<<<< HEAD
=======
  secure: true,
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
});

module.exports = cloudinary;