const express = require("express");
const Route = express.Router();
const userController = require("../controller/userController");
const { authmiddleware, verifyToken } = require("../auth/authMiddleware");
const {
  LoginValidation,
  Validator,
  adduserValidation,
} = require("../validation/validation");

Route.get("/:id?", userController.users);
Route.post(
  "/",
  authmiddleware,
  adduserValidation(),
  Validator,
  userController.addUser
);
Route.patch("/:id", verifyToken, userController.updateUser);
Route.delete("/:id", authmiddleware, userController.deleteUser);
Route.post("/login", LoginValidation(), Validator, userController.login);

module.exports = Route;
