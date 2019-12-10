// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Product = require("../models/product");

// RETREIVE all products
router.get("/", function(req, res) {
  Product.find({}, function(err, product) {
    res.json(product);
  });
});

// RETRIEVE a specific product
router.get("/:id", function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    res.json(product);
  });
});

//CREATE
router.post("/", function(req, res) {
  let product = new Product(req.body);
  product.save();
  res.status(201).send(product);
});

//UPDATE
router.put("/:id", function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.rating = req.body.rating;
    product.reviewcount = req.body.reviewcount;
    product.description = req.body.description;
    product.pic = req.body.pic;
    product.stock = req.body.stock;
    product.product_link = req.body.product_link;
    product.save();
    res.json(product);
  });
});

// //DELETE
router.delete("/:id", function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    product.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});
module.exports = router;




