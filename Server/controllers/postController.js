const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

const fs = require("fs");
const path = require("path");

const getPosts = async (req, res, next) => {
  console.log("req.query", req.query);
  const { postId, userId } = req.query;

  console.log(postId, userId);
  try {
    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 10;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const queryParameters = {};
    if (req.query.userId) queryParameters.userId = req.query.userId;
    if (req.query.postId) queryParameters._id = req.query.postId;
    if (req.query.category) queryParameters.category = req.query.category;
    if (req.query.title) queryParameters.title = req.query.title;
    if (req.query.searchTerms) {
      queryParameters.$or = [
        { title: { $regex: req.query.searchTerms, $options: "i" } },
        { description: { $regex: req.query.searchTerms, $options: "i" } },
      ];
    }
    console.log("postController req query", queryParameters);
    const posts = await PostModel.find(queryParameters)
      .sort({
        updatedAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);
    // const posts = await PostModel.find(
    //   ...(req.query.userId && { userId: req.query.userId }),
    //   ...(req.query.postId && { _id: req.query.postId }),
    //   ...(req.query.category && { category: req.query.category }),
    //   ...(req.query.title && { title: req.query.title }),
    //   ...(req.query.searchTerms && {
    //     $or: [
    //       { title: { $regex: req.query.searchTerms, $options: "i" } },
    //       { description: { $regex: req.query.searchTerms, $options: "i" } },
    //     ],
    //   })
    // )
    // .sort({ updatedAt: sortDirection })
    // .skip(startIndex)
    // .limit(limit);

    // console.log("posts", posts);

    const totalPosts = await PostModel.countDocuments();

    const now = new Date();

    const oneMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthsPosts = await PostModel.countDocuments({
      createdAt: { $gte: oneMonthsAgo },
    });

    let newPosts = await posts.map((post) => {
      const imageFile = fs.readFileSync(post.image, "utf8");
      const imageBase64 = Buffer.from(imageFile).toString("base64");
      return { ...post._doc, imageBase64 };
    });

    // console.log("after", newPosts);

    return res.status(200).json({
      success: true,
      data: { posts: newPosts, totalPosts, lastMonthsPosts },
    });
  } catch (error) {
    console.error("Error getting posts:", error);
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, description, userId, category } = req.body;

    console.log(req.file.path);

    console.log(title, description, userId);

    // Check if all required fields are provided
    if (!title || !description || !userId) {
      next(ErrorHandler(400, "All fields are required."));
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      next(ErrorHandler(404, "User not found."));
    }

    // Check if an image file was uploaded
    // if (!req.file) {
    //   next(ErrorHandler(400, "Image is required."));
    // }

    const image = req.file.path; // Assuming multer saves the file path to req.file.path

    // Create a new post
    const newPost = await PostModel.create({
      title,
      image: req.file.path || image,
      description,
      category,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
};
