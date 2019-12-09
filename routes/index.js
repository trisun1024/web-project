// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Blog = require("../models/blog");
const Product = require("../models/product");
const User = require("../models/user");
const Comment = require("../models/comment");
const Cart = require("../models/cart");
const Transaction = require("../models/transaction");

// page jump
// login
router.get("/login", function(req, res) {
  if (req.cookies.id ) {
    Product.find({}, function(err, product) {
    res.render("home", { products: product });
  });
  } else
    res.render("login", { email: null, error: null });
});
// signup
router.get("/signup", function(req, res) {
  res.render("signup", { email: null, username: null, error: null });
});
// check login
router.post("/auth/login", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      if (user.password === req.body.password) {
        res.cookie("id", req.body.email, { path: "/", signed: false });
        if (user.class == "admin") {
          res.redirect("/admin");
        } else {
          res.redirect("/home");
        }
      } else {
        res.render("login", {
          email: req.body.email === "" ? null : req.body.email,
          error: "Wrong Password"
        });
      }
    } else {
      res.render("login", { email: null, error: "Email Not Exists" });
    }
  });
});
// check signup
router.post("/signup", function(req, res) {
  req.body.id = req.body.email;
  User.findOne({ id: req.body.id }, function(err, result) {
    if (result) {
      res.render("signup", {
        email: null,
        username: null,
        error: "Sorry, Email Exists"
      });
    } else if (req.body.password !== req.body.confirm) {
      res.render("signup", {
        email: req.body.email === "" ? null : req.body.email,
        username: req.body.username === "" ? null : req.body.username,
        error: "Passwords Not Match"
      });
    } else if (req.body.password.length > 16) {
      res.render("signup", {
        email: req.body.email === "" ? null : req.body.email,
        username: req.body.username === "" ? null : req.body.username,
        error: "Password Too Long (>16)"
      });
    } else {
      req.body.class = "user";
      let user = new User(req.body);
      user.save();
      res.render("login", { error: null });
    }
  });
});
// cookies
router.get("/getcookies", function(req, res) {
  res.send(req.cookies);
});
// home index
router.get("/", function(req, res) {
  Product.find({}, function(err, product) {
    res.render("index", { products: product });
  });
});
router.get("/home", (req, res) => {
  Product.find({}, function(err, product) {
    res.render("home", { products: product });
  });
});
// cart
router.get("/cart", function(req, res) {
  res.render("cart", { uid: req.cookies.id });
});
// checkout
router.post("/auth/checkout", function(req, res) {
  let products = req.body.products;
  let qt = 0;
  products.forEach(el => {
    qt += el.count;
  });

  products.forEach(el => {
    if (el.count !== 0) {
      el.date = new Date().toUTCString();
      el.price = el.price * el.count * 1.05 + (5 * el.count) / qt;
      let product = new Transaction(el);
      product.save();
    }
  });
  Cart.deleteMany({ user: req.cookies.id }, function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
});

// product
router.get("/products", (req, res) => {
  Product.find({}, function(err, product) {
    res.render("allprod", { products: product });
  });
});


router.get("/nav", (req, res) => {
    res.render("nav",{cookie: req.cookies.id});
});

router.get("/products/audio", (req, res) => {
  Product.find({}, function(err, product) {
    res.render("prod_audio", { products: product });
  });
});
router.get("/products/everyday", (req, res) => {
  Product.find({}, function(err, product) {
    res.render("prod_evd", { products: product });
  });
});
router.get("/products/keyboards", (req, res) => {
  Product.find({}, function(err, product) {
    res.render("prod_kbd", { products: product });
  });
});
router.get("/products/outdoors", (req, res) => {
  Product.find({}, function(err, product) {
    res.render("prod_outdoors", { products: product });
  });
});
// communities
router.get("/communities", (req, res) => {
  Blog.find({}, function(err, blog) {
    res.render("blog", { blogs: blog });
  });
});
// account
router.get("/account", (req, res) => {
  res.render("account");
});
// admin
router.get("/admin", (req, res) => {
  User.find({}, function(err, user_list) {
    Product.find({}, function(err, product_list) {
      res.render("admin", { users: user_list, products: product_list });
    });
  });
});
// admin form
router.get("/admin/form/user/", (req, res) => {
  var tmp = new User();
  res.render("user-form", { user: tmp });
});
router.get("/admin/form/product/", (req, res) => {
  var tmp = new Product();
  res.render("product-form", { product: tmp });
});
router.get("/admin/form/user/:id", (req, res) => {
  User.findById(req.params.id, function(err, data) {
    res.render("user-form", { user: data });
  });
});
router.get("/admin/form/product/:id", (req, res) => {
  Product.findById(req.params.id, function(err, data) {
    res.render("product-form", { product: data });
  });
});
// admin edit
router.post("/edit/user/:id", (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (!data) {
      let user = new User(req.body);
      user.save();
      res.redirect("/admin");
    } else {
      User.findById(req.params.id, function(err, user) {
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.profile = req.body.profile;
        user.save();
        res.redirect("/admin");
      });
    }
  });
});
router.post("/edit/product/:id", (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (!data) {
      let product = new Product(req.body);
      product.save();
      res.redirect("/admin");
    } else {
      Product.findById(req.params.id, function(err, product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.rating = req.body.rating;
        product.reviewcount = req.body.reviewcount;
        product.description = req.body.description;
        product.pic = req.body.pic;
        product.stock = req.body.stock;
        product.product_link = req.body.product_link;
        product.style = req.body.style;
        product.save();
        res.redirect("/admin");
      });
    }
  });
});
// admin delete
router.get("/delete/user/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    user.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect("/admin");
      }
    });
  });
});
router.get("/delete/product/:id", function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    product.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect("/admin");
      }
    });
  });
});
// product
router.get("/product/:productid", function(req, res) {
  if(req.cookies.id ){
  User.find({ id: req.cookies.id }, function(err, userl) {
    Product.findById(req.params.productid, function(err, productl) {
      Comment.find({ product: req.params.productid }, function(err, commentl) {
        
        res.render("product", {
          product: productl,
          cookie: req.cookies.id,
          comment: commentl,
          user: userl[0]
        });
      });
    });
  });}
  else{
    res.redirect("/login");
  }
});

router.get("/profile/", function(req, res) {
  if(req.cookies.id ){
  User.find({ id: req.cookies.id }, function(err, userl) {
    Comment.find({ user: req.cookies.id }, function(err, commentl) {
      Blog.find({ id: req.cookies.id }, function(err, blogl) {
        Transaction.find({ user: req.cookies.id }, function(err, tranl) {
          res.render("profile", {
            transaction: tranl,
            blog: blogl,
            comment: commentl,
            user: userl,
            cookie: req.cookies.id
          });
        });
      });
    });
  });}
           else{
    res.redirect("/login");
  }
});

router.post("/profile/", function(req, res) {
  User.find({ id: req.cookies.id }, function(err, userl) {
    Comment.find({ user: req.cookies.id }, function(err, commentl) {
      Blog.find({ id: req.cookies.id }, function(err, blogl) {
        Transaction.find({ id: req.cookies.id }, function(err, tranl) {
          User.findByIdAndUpdate(userl[0]._id, req.body, (err, res) => {
            if (err) {
              console.log(err);
            }
          });

          res.render("profile", {
            transaction: tranl,
            blog: blogl,
            comment: commentl,
            user: userl,
            cookie: req.cookies.id
          });
        });
      });
    });
  });
});
router.post("/product/:id", function(req, res) {
  User.find({ id: req.cookies.id }, function(err, userl) {
    Comment.find({ product: req.body.product }, function(err, commentl) {
      Product.findById(req.body.product, function(err, productl) {
        let comment = new Comment(req.body);
        comment.save();
        res.render("product", {
          product: productl,
          cookie: req.cookies.id,
          comment: commentl,
          user: userl
        });
      });
    });
  });
});

router.post("/cart/", function(req, res) {
  // Product.findById(req.body.product._id, function(err, productl) {
  Cart.findOne(
    { product: req.body.product, user: req.cookies.id },
    function(err, cart) {
      if (cart) {
        Cart.findByIdAndUpdate(
          cart._id,
          { count: cart.count + 1 },
          (err, res) => {
            if (err) {
              console.log(err);
            }
          }
        );
        res.render("cart", { uid: req.cookies.id });
      } else {
        let car = new Cart(req.body);
        car.save();
        res.render("cart", { uid: req.cookies.id });
      }
    }
  );
});

module.exports = router;
