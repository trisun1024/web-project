// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Comment = require("../models/comment");

// RETREIVE all comments
router.get("/", function(req,res){
    Comment.find({}, function (err, comment){
        res.json(comment);
    });
});

// RETRIEVE a specific comment
router.get("/:id", function(req, res){
    Comment.findById(req.params.id, function(err, comment) {
        res.json(comment)
    });
});

//CREATE
// router.post('/', function(req, res){
//     let comment = new Comment(req.body);
//     comment.save();
//     res.status(201).send(comment);
// });






//UPDATE
router.put("/:id", function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        comment.user = req.body.user;
        comment.product = req.body.product;
        comment.content = req.body.content;
      comment.date = req.body.date;
        comment.save();
        res.json(comment);
    });
});

//DELETE
router.delete("/:id", function(req, res){
    Comment.findById(req.params.id, function(err, comment) {
        comment.remove(function(err){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(204).send('removed');
            }
        });
    });
});
module.exports = router;