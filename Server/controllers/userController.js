const UserModel = require("../models/userModel");
const createJsonWebToken = require("../utils/createJsonWebToken");
const bcrypt = require("bcryptjs");
const { generateRandomPassword } = require("../utils/generateRandomPassword");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    // One way
    // const user = new UserModel({ username, email, password, mobile });
    // await user.save();

    // Another way to create a collection
    const user = await UserModel.registerStatics(username, email, password);
    const token = createJsonWebToken(user._id);

    // We don't want to send the password to user so
    const { password: hashedPassword, ...rest } = user._doc;

    // adding expiry date for token, we need to sign in every time we request for anything
    // api, so we use expires feautres to use that same token for certain time
    const expiryDate = new Date(Date.now() + 360000); // for 1 hour
    // return res.status(200).json(user);
    res
      .cookie("token", token, {
        // httpOnly: true, // client won't be accesss the sent cookie
        // when does it expires, it denotes that, alternate property is maxAge
        secure: false,
        expires:
          expiryDate /* there are other too like signed, secure, overwrite etc*/,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.loginStatics(email, password);
    const token = createJsonWebToken(user._id);
    const { password: hashedPassword, ...rest } = user._doc;
    return res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json(rest);
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
      const token = createJsonWebToken(userAlreadyExist._id);
      // User already exists, return the user data directly
      res
        .status(200)
        .cookie("token", token, {
          // httpOnly: true, // client won't be accesss the sent cookie
          // when does it expires, it denotes that, alternate property is maxAge
          secure: false,
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

      const token = createJsonWebToken(user._id);

      // Create a new user in the UserModel with 'username' instead of 'displayName'
      const newUser = new UserModel({
        username: displayName, // Assuming you want to use 'displayName' as 'username'
        email,
        password: hashedPassword, // Change to 'password' to match your UserModel schema
      });

      await newUser.save();

      res
        .status(201)
        .cookie("token", token, {
          // httpOnly: true, // client won't be accesss the sent cookie
          // when does it expires, it denotes that, alternate property is maxAge
          secure: false,
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

module.exports = { register, login, google };
