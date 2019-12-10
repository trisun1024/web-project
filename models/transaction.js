
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    name: { type: String },
    product: { type: String },
    price: { type: Number },
    pic: { type: String},
    count: { type: Number},
    user:{ type: String},
    date:{ type: String}
  
  }
);

// Export model
module.exports = mongoose.model("Transaction", transactionSchema);