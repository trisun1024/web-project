const express = require("express");
const router = express.Router();

//import data models
const Cart = require("../models/cart");

// RETREIVE all users
router.get("/", function(req, res) {
  Cart.find({}, function(err, cart) {
    res.json(cart);
  });
});

// RETRIEVE a specific user
router.get("/:id", function(req, res) {
  Cart.findById(req.params.id, function(err, cart) {
    res.json(cart);
  });
});

router.get("/user/:user", function(req, res) {
  Cart.find({user: req.params.user}, function(err, products) {
    res.json(products);  
  });
});

//CREATE
router.post("/", function(req, res) {
  let cart = new Cart(req.body);
  cart.save();
  res.status(201).send(cart);
});

//UPDATE
router.put("/:id", function(req, res) {
  Cart.findById(req.params.id, function(err, cart) {
    cart.name = req.body.name;
    cart.product = req.body.product;
    cart.price = req.body.price;
    cart.pic = req.body.pic;
    cart.count = req.body.count;
    cart.user = req.body.user;
    cart.save();
    res.json(cart);
  });
});

//DELETE
router.delete("/:id", function(req, res) {
  Cart.findById(req.params.id, function(err, cart) {
    cart.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});
module.exports = router;
