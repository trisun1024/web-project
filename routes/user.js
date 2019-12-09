// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const User = require("../models/user");

// RETREIVE all users
router.get("/", function(req, res) {
  User.find({}, function(err, user) {
    res.json(user);
  });
});

// RETRIEVE a specific user
router.get("/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.json(user);
  });
});

router.get('/id/:id', function(req, res) {
  User.findOne({id: req.params.id}, function(err, user) {
    res.json(user);
  });
});

//CREATE
router.post("/", function(req, res) {
  let user = new User(req.body);
  user.save();
  res.status(201).send(user);
});

//UPDATE
router.put("/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.profile = req.body.profile;
    user.save();
    res.json(user);
  });
});

//DELETE
router.delete("/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});
module.exports = router;
