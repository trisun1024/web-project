const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: String, required: true },
  product:{ type: String },
  content: { type: String },
  date: {type: String},
  pic:{type:String},
  name:{ type: String },
  avatar:{type: String }
});

// Export model
module.exports = mongoose.model("Comment",CommentSchema);