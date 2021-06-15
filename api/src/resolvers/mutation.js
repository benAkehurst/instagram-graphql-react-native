const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const gravatar = require('../util/gravatar');
const imageUpload = require('../util/photos');

module.exports = {
  uploadPhoto: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to upload a photo');
    }

    const uploadedImageUrl = await imageUpload(args.file);

    try {
      return await models.Photo.create({
        url: uploadedImageUrl,
        caption: args.caption,
        user: mongoose.Types.ObjectId(user.id),
        favoriteCount: 0
      });
    } catch (err) {
      throw new Error('Error uploading image');
    }
  },
  deletePhoto: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a photo');
    }
    const photo = await models.Photo.findById(id);
    if (photo && String(photo.author) !== user.id) {
      throw new ForbiddenError(
        "You don't have permissions to delete the photo"
      );
    }

    try {
      await photo.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updatePhoto: async (parent, { caption, id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a photo');
    }

    const photo = await models.Photo.findById(id);
    if (photo && String(photo.author) !== user.id) {
      throw new ForbiddenError(
        "You don't have permissions to update the photo"
      );
    }

    return await models.Photo.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          caption
        }
      },
      {
        new: true
      }
    );
  },
  toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError();
    }

    let photoCheck = await models.Photo.findById(id);
    const hasUser = photoCheck.favoritedBy.indexOf(user.id);

    if (hasUser >= 0) {
      return await models.Photo.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
        {
          new: true
        }
      );
    } else {
      return await models.Photo.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true
        }
      );
    }
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });

      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });

    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }
};
