const express = require("express");
const {
  register,
  login,
  google,
  updateProfile,
  deleteUser,
  logout,
} = require("../controllers/userController");
const userUpload = require("../middleware/multer");
const { requireAuth } = require("../middleware/requireAuth");

const Router = express.Router();

Router.post("/register", register);

Router.post("/login", login);

Router.post("/google", google);

Router.patch(
  "/update-profile/:id",
  requireAuth,
  userUpload.single("photo"),
  updateProfile
);

Router.delete("/delete-profile/:id", deleteUser);

Router.get("/logout/:id", logout);

// Router.patch("/update-password/:id", updatePassword);
// Router.route("/authenticate").post(controller.verifyUser, (req, res) =>
//   res.end()
// );

const userRoutes = Router;

module.exports = userRoutes;
