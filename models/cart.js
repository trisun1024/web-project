
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    name: { type: String },
    product: { type: String },
    price: { type: Number },
    pic: { type: String},
    count: { type: Number},
    user:{ type: String}
  }
);

// Export model
module.exports = mongoose.model("Cart", CartSchema);
