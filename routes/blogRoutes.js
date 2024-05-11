const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router.get("/", blogController.blog_index);

// post blogs
router.post("/", (req, res) => {
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
router.get("/create", blogController.blog_create_get);

// View single Blog
router.get("/:id", blogController.blog_details);

// Delete Blogs

router.delete("/:id", (req, res) => {
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

module.exports = router;
