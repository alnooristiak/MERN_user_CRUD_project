const UserModel = require("../models/userModel");

const getUser = (req, res) => {
  res.send({
    success: true,
    message: "data comming form mvc pattrn",
  });
};

const addUser = (req, res) => {
  const { inputData } = req.body;
  res.json({
    success: true,
    message: `welcome to form ${inputData}`,
  });
};

// create a new user - post
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    // 201 is mense anything create, success
    res.status(201).json({
      user,
      message: "success",
    });
  } catch (error) {
    console.log(`error in create user ${error}`);
    res.status(400).json({
      message: false,
      error,
    });
  }
};

// get all user - get
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "get all user error",
      error: error.message,
    });
  }
};

// get single user by id - get
const getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.status(200).json({
        success: true,
        userName: user.name,
      });
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "get single user error",
      error: error.message,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(201).json({
        success: true,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "error from update user",
      error: error.message,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({
        success: true,
        _id: deletedUser.id,
        name: deletedUser.name,
        message: "user deleted",
      });
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "error from delete user",
      error: error.message,
    });
  }
};

module.exports = {
  getUser,
  addUser,
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
