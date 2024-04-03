const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const postUpload = require("../middleware/postsMulter");
const requireAuth = require("../middleware/requireAuth");

const postRouter = express.Router();

postRouter.get("/get-posts", getPosts);

postRouter.post(
  "/create-post",
  requireAuth,
  postUpload.single("image"),
  createPost
);

module.exports = postRouter;
