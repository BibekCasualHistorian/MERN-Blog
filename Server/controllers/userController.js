const UserModel = require("../models/userModel");
const createJsonWebToken = require("../utils/createJsonWebToken");
const bcrypt = require("bcryptjs");

const path = require("path");
const fs = require("fs");

const validator = require("validator");
const { generateRandomPassword } = require("../utils/generateRandomPassword");
const PostModel = require("../models/postModel");

const getUsers = async (req, res, next) => {
  console.log("user req query", req.query);
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = req.query.limit || 10;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const queryParameters = {};
    const allUsers = await UserModel.find(queryParameters)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    console.log(allUsers);
    const users = allUsers.map((user) => {
      const imageFile = fs.readFileSync(user._doc.photo, "utf8");
      const imageBase64 = Buffer.from(imageFile).toString("base64");
      return { ...user._doc, imageBase64 };
    });
    const totalUsers = await PostModel.countDocuments();
    const now = new Date();
    const oneMonthsAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthsUsers = await PostModel.countDocuments({
      createdAt: { $gte: oneMonthsAgo },
    });
    return res
      .status(200)
      .json({ success: true, data: { users, totalUsers, lastMonthsUsers } });
  } catch (e) {
    console.log(e);
    next(e.message);
  }
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    // One way
    // const user = new UserModel({ username, email, password, mobile });
    // await user.save();

    // Another way to create a collection
    const user = await UserModel.registerStatics(username, email, password);
    console.log("user", user);
    const token = await createJsonWebToken(user._id, user.isAdmin);

    // We don't want to send the password to user so
    const { password: hashedPassword, ...rest } = user._doc;

    console.log(token);

    // adding expiry date for token, we need to sign in every time we request for anything
    // api, so we use expires feautres to use that same token for certain time
    const expiryDate = new Date(Date.now() + 36000000); // for 1 hour
    // return res.status(200).json(user);
    return res
      .cookie("token", token, {
        // httpOnly: true, // client won't be accesss the sent cookie
        // when does it expires, it denotes that, alternate property is maxAge
        secure: false,
        httpOnly: true,
        expires:
          expiryDate /* there are other too like signed, secure, overwrite etc*/,
      })
      .status(200)
      .json({ success: true, data: rest });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.loginStatics(email, password);
    const token = createJsonWebToken(user._id, user.isAdmin);

    const { password: hashedPassword, ...rest } = user._doc;
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 36000000),
      })
      .status(200)
      .json({ success: true, data: rest });
  } catch (error) {
    console.log("error", error);
    next(error);
    // return res.status(400).json({ status: "error", error: error.message });
  }
};

const google = async (req, res, next) => {
  const expiryDate = new Date(Date.now() + 360000);
  try {
    // Assuming you send the data from the frontend in the request body
    const { displayName, email, photoURL } = req.body;

    const userAlreadyExist = await UserModel.findOne({ email });

    if (userAlreadyExist) {
      const token = await createJsonWebToken(userAlreadyExist._id);
      console.log("token above", token);
      // User already exists, return the user data directly
      res
        .status(201)
        .cookie("token", token, {
          // httpOnly: true, // client won't accesss the sent cookie
          // when does it expires, it denotes that, alternate property is maxAge
          // secure: false,
          // httpOnly: true,
          expires:
            expiryDate /* there are other too like signed, secure, overwrite etc*/,
        })
        .json({
          success: true,
          data: userAlreadyExist, // Include user data directly
        });
    } else {
      // User doesn't exist, create a new user

      // Generate a random password
      const password = generateRandomPassword();

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the UserModel with 'username' instead of 'displayName'
      const newUser = new UserModel({
        username: displayName, // Assuming you want to use 'displayName' as 'username'
        email,
        photo: photoURL,
        password: hashedPassword, // Change to 'password' to match your UserModel schema
      });

      await newUser.save();

      const token = await createJsonWebToken(newUser._id, newUser.isAdmin);
      console.log("token below", token);

      res
        .status(201)
        .cookie("token", token, {
          // httpOnly: true, // client won't be accesss the sent cookie
          // when does it expires, it denotes that, alternate property is maxAge
          // secure: false,
          httpOnly: true,
          expires:
            expiryDate /* there are other too like signed, secure, overwrite etc*/,
        })
        .json({
          success: true,
          data: newUser,
        });
    }
  } catch (error) {
    console.error("Error processing user:", error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userId = req.params.id; // Extract userId from route parameters

    const photo = req.file;
    console.log(userId, username, email, password, photo);
    const errors = [];

    // Validate email using validator if provided
    if (email && !validator.isEmail(email)) {
      errors.push("Invalid email address");
    }

    // Validate minimum length for password and username
    if (password && password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (username && username.length < 3) {
      errors.push("Username must be at least 3 characters long");
    }

    // Check if the username is unique
    if (username) {
      const isUsernameTaken = await UserModel.findOne({
        username,
        _id: { $ne: userId },
      });
      if (isUsernameTaken) {
        errors.push("Username is already taken");
      }
    }

    // Return accumulated errors with custom status code and message if any
    if (errors.length > 0) {
      console.error(errors);
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.errors = errors;
      throw error;
    }

    // Update user data
    const updatedUserData = {};
    if (username) updatedUserData.username = username;
    if (email) updatedUserData.email = email;

    // Hash the new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUserData.password = hashedPassword;
    }

    // Handle profile image upload
    if (photo) {
      // Process and store the profile image as needed
      // For simplicity, let's assume you store it in a 'uploads' directory
      const uploadedImagePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        "users",
        userId + ".jpg"
      );

      // fs.writeFileSync(uploadedImagePath, photo, "utf-8");
      // You may want to use a unique filename
      // Save the image path to the user data
      updatedUserData.photo = uploadedImagePath;
    }

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updatedUserData,
      { new: true }
    );

    console.log("updated", updatedUser);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.params.id; // Extract userId from route parameters

    // Clear the user's authentication token or session (example using JWT)
    // You may need to implement your specific authentication logic here
    // For illustration purposes, assuming you have a token stored in the user document

    const user = await UserModel.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Clear the token field (assuming a field called 'token' in the user document)
    // user.token = null;

    // Save the updated user document
    // await user.save();

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Extract userId from route parameters

    console.log(userId);
    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // If the user exists, delete it
    await UserModel.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};

module.exports = {
  getUsers,
  register,
  login,
  google,
  updateProfile,
  deleteUser,
  logout,
};
