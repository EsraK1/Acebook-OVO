const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate('postauthor').sort( {datePosted: -1} ).find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Delete: (req, res) => {
    Post.deleteOne({_id: req.body._id}, (err) => {
      if (err) {
        throw err;
      } else {
        res.status(201).json({ message: 'OK' });
      }
    }) },

  Update: async (req, res) => {
    Post.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { likes: req.body.userId } }
    ).exec()
    res.status(200).json({ message: 'like added'})
  }

};

module.exports = PostsController;
