const mongoose = require("mongoose");
const path = require("path");

let defaultImage = path.join(
  __dirname,
  "..",
  "..",
  "uploads",
  "posts",
  "r3.png"
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: defaultImage,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["uncategorized", "react", "nextjs", "others"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
