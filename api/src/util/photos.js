const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageUpload = async imageFile => {
  try {
    const { createReadStream } = await imageFile;
    const stream = createReadStream();
    const cloudinaryResponse = await cloudinary.uploader.upload(stream.path, {
      folder: 'my-folder'
    });
    return cloudinaryResponse.eager[0].secure_url;
  } catch (error) {
    throw new Error(
      'There was a problem uploading your image. Please try again.'
    );
  }
};

module.exports = imageUpload;
