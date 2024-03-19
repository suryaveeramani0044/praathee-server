const express = require("express");
const Route = express.Router();
const empController = require("../controller/empController");
const { authmiddleware, verifyToken } = require("../auth/authMiddleware");
const { Validator, adduserValidation } = require("../validation/validation");

Route.get("/", empController.allEmp);
Route.post(
  "/",
  authmiddleware,
  adduserValidation(),
  Validator,
  empController.addEmp
);
Route.patch("/:id", verifyToken, empController.updateEmp);
Route.delete("/:id", authmiddleware, empController.deleteEmp);

module.exports = Route;
