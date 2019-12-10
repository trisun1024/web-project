// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Transaction = require("../models/transaction");

// RETREIVE all users
router.get("/", function(req, res) {
  Transaction.find({}, function(err, cart) {
    res.json(cart);
  });
});

module.exports = router;