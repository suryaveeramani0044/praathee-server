const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.users = async (req, res, next) => {
  try {
    const user = req.params.id
      ? await User.findById(req.params.id)
      : await User.find();
    return res.status(200).json({
      success: true,
      message: req.params.id
        ? "user details retrieved successfully"
        : "All user data retrieved successfully",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hassedPassword = bcrypt.hashSync(req?.body?.password, salt);
    let user = new User({
      ...req.body,
      password: hassedPassword,
    });
    user = await user.save();
    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let updateUser = req.body;
    if (updateUser.password) {
      const salt = bcrypt.genSaltSync(10);
      updateUser.password = bcrypt.hashSync(req.body.password, salt);
    }
    let user = await User.findByIdAndUpdate(req.params.id, updateUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "user details updated succesfully",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    return res.status(user.deletedCount === 1 ? 200 : 400).json({
      success: user.deletedCount === 1 ? true : false,
      message:
        user.deletedCount === 1 ? "user deleted succesfully" : "user not found",
      count: user.deletedCount,
    });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const result = bcrypt.compareSync(password, user.password);
    if (!result) {
      return res.status(200).json({
        success: false,
        message: "password wrong",
      });
    }
    const token = jwt.sign(user.toObject(), process.env.JWT_KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(200).json({
      success: true,
      message: "user logged succesfully succesfully",
      token: token,
    });
  } catch (e) {
    next(e);
  }
};
