const cloudinary = require('cloudinary');

const uploadPhoto = async photo => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  try {
    const result = await cloudinary.v2.uploader.upload(photo, {
      allowed_formats: ['jpg', 'png'],
      public_id: '',
      folder: 'insta-clone'
    });
    return result.url;
  } catch (e) {
    return false;
  }
};

module.exports = uploadPhoto;
