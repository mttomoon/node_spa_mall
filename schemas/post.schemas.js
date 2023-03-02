const mongoose = require("mongoose");
const commentsSchema = require('./comments.schemas.js');
// const {Schema} = mongoose;
// const {Types:{ObjectId}} = Schema;
 
const postSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: Number,
  },
  title: {
    type: String,
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentsSchema]
});

module.exports = mongoose.model("Post", postSchema);