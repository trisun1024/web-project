// Data Model for Product
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
 
    name: { type: String },
    price: { type: Number },
    rating: { type: Number },
    reviewcount: { type: Number },
    description: { type: Array },
    pic: { type: Array },
    stock: { type: Number },
    product_link: {type: String},
    style:{type: String}
  }
);

// Export model
module.exports = mongoose.model("Product", ProductSchema);
