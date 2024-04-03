const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
  getComments,
  updateLikeAndDislikes,
} = require("../controllers/commentController");

const commentRoutes = express.Router();

commentRoutes.get("/get-comment", getComments);

commentRoutes.post("/create-comment", createComment);

commentRoutes.patch("/update-like-dislikes", updateLikeAndDislikes);

commentRoutes.patch("/update-comment", updateComment);

commentRoutes.delete("/delete-comment", deleteComment);

module.exports = commentRoutes;
