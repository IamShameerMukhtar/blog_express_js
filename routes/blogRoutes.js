const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router.get("/", blogController.blog_index);
// post blogs
router.post("/", blogController.blog_create_post);
// View all blogs
router.get("/create", blogController.blog_create_get);
// View single Blog using id
router.get("/:id", blogController.blog_details);
// Delete Blogs using id
router.delete("/:id", blogController.blog_create_delete);
// about
module.exports = router;
