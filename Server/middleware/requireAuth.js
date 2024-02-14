const jwt = require("jsonwebtoken");

// use body parser

const requireAuth = (req, res, next) => {
  // getting token from client
  const token = req.cookies.token;
  console.log("token in require Auth", token);

  // check whether we got the token or not
  if (!token) {
    return res.status(401).json({ error: "Sorry, Unauthorized Request" });
  }

  // verify the jwt token we got from client
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token verification failed" });
    }

    // appending everything to req.user to check further, the decoded mostly           have _id as we have put that in jwt.sign() when we sent that to user. we         get that _id, as we want to update the specific user profile or delete, we       send the id in params and we check that id with jwt decoded id
    req.user = decoded;
    next();
  });
};

module.exports = { requireAuth };
