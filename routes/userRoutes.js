const express = require("express");
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// routes router object
const router = express.Router();

// create new user - post
router.post("/create-user", createUser);

// get all users - get
router.get("/get-users", getAllUsers);

// get single user by id - get
router.get("/get-user/:id", getSingleUser);

// update user - put
router.put("/update-user/:id", updateUser);

// delete user - delete
router.delete("/delete-user/:id", deleteUser);

// export routes
module.exports = router;
