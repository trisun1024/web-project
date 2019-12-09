// Data Model for Blog
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  id:{type: Number},
  username: { type: String },
  community: { type: String },
  title: { type: String },
  content: { type: String },
  image: { type: String },
  time: { type: Date },
  id:{type: String}
});

// Export model
module.exports = mongoose.model("Blog", BlogSchema);
