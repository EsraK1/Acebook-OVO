const { response } = require("express");
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

  Comment: async (req, res) => {
    
  
    Post.findByIdAndUpdate(
      { _id: req.body._id },
      { $push:{ comments:{ user_id: req.body.user_id, user_comment: req.body.user_comment }}}
  ).exec()
  const token = await TokenGenerator.jsonwebtoken(req.user_id)
  res.status(200).json({message: "ok", token: token})
  }
};


module.exports = PostsController;
