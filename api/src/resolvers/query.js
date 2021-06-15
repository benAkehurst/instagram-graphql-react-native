module.exports = {
  photos: async (parent, args, { models }) => {
    return await models.Photo.find().limit(100);
  },
  photo: async (parent, args, { models }) => {
    return await models.Photo.findById(args.id);
  },
  photoFeed: async (parent, { cursor }, { models }) => {
    const limit = 10;
    let hasNextPage = false;
    let cursorQuery = {};
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }
    let photos = await models.Photo.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);
    if (photos.length > limit) {
      hasNextPage = true;
      photos = photos.slice(0, -1);
    }
    const newCursor = photos[photos.length - 1]._id;
    return {
      photos,
      cursor: newCursor,
      hasNextPage
    };
  },
  user: async (parent, args, { models }) => {
    return await models.User.findOne({ username: args.username });
  },
  users: async (parent, args, { models }) => {
    return await models.User.find({});
  },
  me: async (parent, args, { models, user }) => {
    return await models.User.findById(user.id);
  }
};
