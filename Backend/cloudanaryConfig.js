//code to tell how to access cloudanary account

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUDNAME,
    api_key : process.env.CLOUD_APIKEY,
    api_secret : process.env.CLOUD_APISECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Car_Dealership',
      allowedFormates:["png" , "jpg" , "jpeg"]
    },
});

module.exports = {
    cloudinary , storage
}