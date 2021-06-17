const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');

const imageUpload = async (file, uploadLocation, userId) => {
  const { createReadStream, filename } = await file;
  const fileStream = createReadStream();

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.v2.uploader.upload_stream(
      {
        allowed_formats: ['jpg', 'png', 'heic', 'heif', 'jpeg'],
        public_id:
          uploadLocation === 'image'
            ? `image_uploads/${filename}_${uuidv4()}`
            : `avatar_uploads/${filename}_${userId}`,
        folder: 'insta_clone'
      },
      (err, fileUploaded) => {
        if (err) {
          reject(err);
        }
        resolve(fileUploaded.secure_url);
      }
    );

    fileStream.pipe(cloudStream);
  });
};

module.exports = imageUpload;
