// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

 
// cloudinary.config({
//     cloud_name: process.env.CLOUDNAME,
//     api_key: process.env.CLOUD_APIKEY,
//     api_secret: process.env.CLOUD_APISECRET
// });

// // ✅ Ensure Cloudinary is properly initialized
// if (!cloudinary.uploader) {
//     console.error("Cloudinary uploader is not initialized. Check your credentials.");
// }

// // ✅ Cloudinary Storage Setup
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "Car_Dealership",
//       allowed_formats: ["png", "jpg", "jpeg", "pdf"], // ✅ Correct key is 'allowed_formats'
//     },
// });



// module.exports = { cloudinary, storage };


const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,  // Ensure variable names match .env
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_APISECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Car_Dealership",
        format: async (req, file) => "png", // Supports jpg, png, etc.
        public_id: (req, file) => file.originalname.split(".")[0], // Use original filename
    },
});

// const upload = multer({ storage });

module.exports = { cloudinary, storage };
