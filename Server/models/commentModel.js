const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const commentsSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    noOfLikes: {
      type: Number,
      default: 0,
    },
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    noOfDislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// commentsSchema.pre(["save", "updateOne", "findOneAndUpdate"], function (next) {
//   const likes = this.get("likes");
//   this.noOfLikes = likes.length();

//   // const dislikes = this.get("dislikes");
//   // this.noOfDislikes = dislikes ? dislikes.length : 0;

//   next();
// });

const CommentsModel = mongoose.model("Comments", commentsSchema);

module.exports = CommentsModel;
