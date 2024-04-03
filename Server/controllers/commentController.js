const CommentsModel = require("../models/commentModel");

const getComments = async (req, res, next) => {
  try {
    const postId = req.query.postId;
    const queryParameters = {};
    if (postId) queryParameters.postId = postId;
    const comments = await CommentsModel.find(queryParameters).populate(
      "userId"
    );
    const now = new Date();
    const oneMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const totalComments = await CommentsModel.countDocuments();
    const lastMonthsComments = await CommentsModel.countDocuments({
      createdAt: { $gte: oneMonthsAgo },
    });
    // console.log("comments", comments);
    return res.status(200).json({
      success: true,
      data: { comments, totalComments, lastMonthsComments },
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { comment, postId, userId } = req.body;
    console.log(comment, postId, userId);
    const comments = await CommentsModel.create({
      comment,
      postId,
      userId,
    });

    const newComment = await CommentsModel.findById(comments._id).populate(
      "userId"
    );
    res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    next(error);
  }
};

const updateLikeAndDislikes = async (req, res, next) => {
  try {
    const commentId = req.query.commentId;
    const { action } = req.body;

    console.log("action", action);

    const { reaction, userId } = action;

    let toBeUpdatedComment = await CommentsModel.findOne({
      _id: commentId,
    }).populate("userId");

    console.log(toBeUpdatedComment);

    if (reaction == "like") {
      if (toBeUpdatedComment.likes.includes(userId)) {
        console.log("includes");
        const indexOfComment = toBeUpdatedComment.likes.indexOf(userId);
        toBeUpdatedComment.likes.splice(indexOfComment, 1);
      } else {
        toBeUpdatedComment.likes.push(userId);
      }
      toBeUpdatedComment.noOfLikes = toBeUpdatedComment.likes.length;
    } else if (reaction == "dislike") {
      if (toBeUpdatedComment.dislikes.includes(userId)) {
        const indexOfComment = toBeUpdatedComment.dislikes.indexOf(userId);
        toBeUpdatedComment.dislikes.splice(indexOfComment, 1);
      } else {
        toBeUpdatedComment.dislikes.push(userId);
      }
      toBeUpdatedComment.noOfDislikes = toBeUpdatedComment.dislikes.length;
    }

    await toBeUpdatedComment.save();

    console.log("toBeUpdatedComment", toBeUpdatedComment);
    // Return the updated comment object
    res.status(201).json({
      success: true,
      data: toBeUpdatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const commentId = req.query.commentId;
    const userId = req.query.userId;
    const { comment } = req.body;
    console.log("commentId", commentId, userId, comment);
    const updatedComment = await CommentsModel.findOneAndUpdate(
      { _id: commentId, userId: userId },
      { comment },
      { new: true }
    );
    console.log(updatedComment);
    res.status(201).json({
      success: true,
      data: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    next(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.query.commentId;
    const { userId } = req.body;
    console.log("commentId", commentId, userId);
    const deletedComment = await CommentsModel.findOneAndDelete({
      _id: commentId,
      // userId: userId,
    });
    console.log("deletedComment", deletedComment);
    res.status(201).json({
      success: true,
      data: deletedComment,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    next(error);
  }
};

module.exports = {
  getComments,
  updateLikeAndDislikes,
  createComment,
  deleteComment,
  updateComment,
};
