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
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Sorry some issue", err);
  });
// view engine

app.set("view engine", "ejs");

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "This is my new first blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
// view Blogs
app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(4000);
// middle for static files

app.use(express.static("public"));

//creating a middlewere
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("Hello Shameer");
//   next();
// });

// Handle Requests
app.get("/", (req, res) => {
  const blogs = [
    { title: "Shameer is here", snippet: "hello Shameer" },
    { title: "Khurram is here", snippet: "hello Khrram" },
    { title: "Ali is here", snippet: "hello ali" },
  ];
  res.render("index", { title: "Home", blogs });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
