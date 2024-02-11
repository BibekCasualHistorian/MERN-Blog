const express = require("express");
const { register, login, google } = require("../controllers/userController");

const Router = express.Router();

Router.post("/register", register);

Router.post("/login", login);

Router.post("/google", google);

// Router.patch("/update-password/:id", updatePassword);

// Router.delete("/delete-account/:id", requireAuth, deleteAccount);

// Router.get("/logout", logout);

// Router.route("/authenticate").post(controller.verifyUser, (req, res) =>
//   res.end()
// );

const userRoutes = Router;

module.exports = userRoutes;
