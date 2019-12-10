const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const fetch = require("node-fetch");

// initiate mongoDB
const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;
// console.log("Connection String: "+mongoDB);

mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  retryWrites: true
});

//debugging
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + process.env.DATABASE);
});

mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected.");
});

//
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://" +
        process.env.PROJECT_DOMAIN +
        ".glitch.me/login/github/return"
    },
    function(token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://" +
        process.env.PROJECT_DOMAIN +
        ".glitch.me/login/google/return"
    },
    function(token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        "https://" +
        process.env.PROJECT_DOMAIN +
        ".glitch.me/login/facebook/return"
    },
    function(token, tokenSecret, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//start express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("Secret Cat"));

app.use(express.static("public"));

// set the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require("cookie-parser")());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// on clicking "logoff" the cookie is cleared
app.get("/logoff", function(req, res) {
  req.session.destroy();
  res.clearCookie("id");
  res.redirect("/");
});

// github
app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/login/github/return",
  passport.authenticate("github", { failureRedirect: "/" }),
  function(req, res) {
    let user = res.req.user;
    let id = "github" + user.id;
    res.cookie("id", id, { path: "/", signed: false });
    User.findOne({ id: id }, function(err, result) {
      if (!result) {
        let user_data = {};
        user_data.id = id;
        user_data.email = null;
        user_data.username = user.username;
        user_data.password = null;
        user_data.profile = user.photos[0].value;
        user_data.class = "github";
        let new_user = new User(user_data);
        new_user.save();
      } else {
        console.log(user);
      }
    });
    res.redirect("/home");
  }
);
// google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);
app.get(
  "/login/google/return",
  passport.authenticate("google", { failureRedirect: "/" }),
  function(req, res) {
    let user = res.req.user;
    let id = "google" + user.id;
    res.cookie("id", id, { path: "/", signed: false });
    User.findOne({ id: id }, function(err, result) {
      if (!result) {
        let user_data = {};
        user_data.id = id;
        user_data.email = null;
        user_data.username = user.displayName;
        user_data.password = null;
        user_data.profile = user.photos[0].value;
        user_data.class = "google";
        let new_user = new User(user_data);
        new_user.save();
      }
    });
    res.redirect("/home");
  }
);
// facebook
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/login/facebook/return",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function(req, res) {
    let user = res.req.user;
    let id = "facebook" + user.id;
    res.cookie("id", id, { path: "/", signed: false });
    User.findOne({ id: id }, function(err, result) {
      if (!result) {
        let user_data = {};
        user_data.id = id;
        user_data.email = null;
        user_data.username = user.displayName;
        user_data.password = null;
        fetch("https://randomuser.me/api/?results=1")
          .then(res => res.json())
          .then(function(response) {
            user_data.profile = response.results[0].picture.large;
          });
        user_data.class = "facebook";
        let new_user = new User(user_data);
        new_user.save();
      }
    });
    res.redirect("/home");
  }
);

// success
app.get(
  "/success",
  require("connect-ensure-login").ensureLoggedIn("/"),
  function(req, res) {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.sendFile(__dirname + "/views/success.html");
  }
);

// Load routes
const indexRoute = require("./routes/index");
const blogRoute = require("./routes/blog");
const commentRoute = require("./routes/comment");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const transactionRoute = require("./routes/transaction");

app.use("/", indexRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/cart", cartRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
