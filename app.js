const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();
// Connect to Mongodb
const dbURI = "mongodb+srv://root:root@blog.xw5ksth.mongodb.net/";
mongoose
  .connect(dbURI)
  .then((result) => {
    //console.log(result);
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
// view engine

app.set("view engine", "ejs");

app.listen(4000);
// middle for static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//creating a middlewere
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("Hello Shameer");
//   next();
// });

// Handle Requests
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// view blogs
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post blogs
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// create
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// View single Blog
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("Details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete Blogs

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// about

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
