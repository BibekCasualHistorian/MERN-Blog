const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Your username is not unique"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Your Email is already registered"],
    },
    // creator: {
    //   type: Object,
    // },
    // mobile: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.tmgWGdzGFmIwg1iaqCbSvgHaHa?w=179&h=194&c=7&r=0&o=5&pid=1.7",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.registerStatics = async function (
  username,
  email,
  password
  //   mobile,
  //   photo
) {
  console.log(username, email, password);

  if (!username || !email || !password) {
    const error = new Error("Please fill in all fields");
    error.statusCode = 404;
    throw error;
  }

  // check whether Email is already registered
  const isAlreadyRegistered = await this.findOne({ email });
  if (isAlreadyRegistered) {
    const error = new Error(
      "You already have registered. Please login to continue"
    );
    error.statusCode = 405;
    throw error;
  }

  // check whether username is unique or not
  const isUsernameUnique = await this.findOne({ username });
  if (isUsernameUnique) {
    const error = new Error("You must have unique Username");
    error.statusCode = 405;
    throw error;
  }

  // check whether mobile is unique or not
  //   const isMobileUnique = await this.findOne({ mobile });
  //   if (isMobileUnique) {
  //     throw Error("Your mobile number should be unique");
  //   }

  // check whether email is valid or not
  if (!validator.isEmail(email)) {
    const error = new Error("Invalid email address");
    error.statusCode = 405;
    throw error;
  }

  // Check if the username contains only alphanumeric characters and underscores // if (!validator.isAlphanumeric(username, "en-US")) { //   throw new Error( //     "Username should contain only letters, numbers, or underscores" //   ); // } // Check if the username is at least 3 characters long

  if (!validator.isLength(username, { min: 3 })) {
    const error = new Error("Username should be at least 3 characters long");
    error.statusCode = 406;
    throw error;
  }

  // Check if the mobile number is a valid phone number // if (!validator.isMobilePhone(mobile, "en-US")) { //   throw new Error("Invalid mobile number"); // }

  // check whether password is strong or not
  if (!validator.isStrongPassword(password)) {
    const error = new Error("Weak Password");
    error.statusCode = 406;
    throw error;
  }

  const salt = await bcrypt.genSalt(10); // generate salt
  const hash = await bcrypt.hash(password, salt); // generate hash

  // create the document in database
  const user = await this.create({
    username,
    email,
    password: hash,
    // mobile,
  });
  return user;
};

userSchema.statics.loginStatics = async function (email, password) {
  // checks whether all credentials are given or not
  if (!email || !password) {
    const error = new Error("Please enter all credentials");
    error.statusCode = 406;
    throw error;
  }

  // check whether email is valid or not
  if (!validator.isEmail(email)) {
    const error = new Error("Invalid email address");
    error.statusCode = 406;
    throw error;
  }

  // check whether user is previously registered or not
  const user = await this.findOne({ email });
  if (!user) {
    const error = new Error("You haven't registered yet");
    error.statusCode = 406;
    throw error;
  }

  // checks whether password is correct or not
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    const error = new Error("Password doesn't match");
    error.statusCode = 408;
    throw error;
  }
  return user;
};

//Export the model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
