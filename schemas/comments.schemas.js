const mongoose = require("mongoose");
 
const commentsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: Number,
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = commentsSchema;

// module.exports = mongoose.model("Comment", commentsSchema);

//postId: {
//    type: "string"
// },