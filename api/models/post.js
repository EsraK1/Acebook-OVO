const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  datePosted: {
    type: Date,
    default: () => Date.now(),
  },
});
// Update the route? That works with postman
// Create some tests to check this works for the model file and controller
// Integrate with the frontend? Date.now => 
const Post = mongoose.model("Post", PostSchema);

// Post.insertMany([
//   {message: 'Test post one', datePosted: "2017-05-18T16:00:00Z"},
//   {message: 'Test post two', datePosted: "2018-05-18T16:00:00Z"},
//   {message: 'Test post three', datePosted: "2016-05-18T16:00:00Z"}
// ]); 
 
module.exports = Post;
