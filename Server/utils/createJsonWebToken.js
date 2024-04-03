const jwt = require("jsonwebtoken");
const secretKey = process.env.JSONWEBTOKEN_SECRET;

const createJsonWebToken = async (user, isAdmin) => {
  const token = jwt.sign({ user, isAdmin }, secretKey, {
    expiresIn: "1h",
  });
  // console.log("Generated Token:", token);
  return token;
};

module.exports = createJsonWebToken;
