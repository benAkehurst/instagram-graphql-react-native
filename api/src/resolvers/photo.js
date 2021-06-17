module.exports = {
  // Resolve the author info for a note when requested
  user: async (photo, args, { models }) => {
    return await models.User.findById(photo.user);
  },
  // Resolved the favoritedBy info for a note when requested
  favoritedBy: async (photo, args, { models }) => {
    return await models.User.find({ _id: { $in: photo.favoritedBy } });
  }
};
