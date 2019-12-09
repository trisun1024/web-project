// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Blog = require("../models/blog");

// RETREIVE all blogs
router.get("/", function(req, res) {
  Blog.find({}, function(err, blog) {
    res.json(blog);
  });
});

// RETRIEVE a specific blog
router.get("/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    res.json(blog);
  });
});

//CREATE
router.post("/", function(req, res) {
  let blog = new Blog(req.body);
  blog.save();
  res.status(201).send(blog);
});

//UPDATE
router.put("/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    blog.id = req.body.id;
    blog.username = req.body.username;
    blog.community = req.body.community;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.image = req.body.image;
    blog.time = req.body.time;
    blog.id = req.body.id;
    blog.save();
    res.json(blog);
  });
});

//DELETE
router.delete("/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    blog.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});
module.exports = router;
