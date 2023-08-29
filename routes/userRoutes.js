const express = require("express");
const router = express.Router();
const { verifyUser, verifyAdmin } = require("../middlewares/tokenMW");
const {
  updateUserValidation,
  loginUserValidation,
  createUserValidation,
} = require("../middlewares/userMW");
const {
  createUser,
  userLogin,
  getUser,
  updateUser,
  changePassword,
  userLogout,
  resetPassword
} = require("../controllers/usercontrollers");
const {
  getAllUsers,
  updateUserAd,
  deleteUser,
} = require("../controllers/adminControllers");
//USER**********************************************************************************

//POST-USER REGISTER
router.post("/createUser", createUserValidation(), createUser);
//POST-USER LOGIN
router.post("/login", loginUserValidation(), userLogin);
//GET-USER DETAILS
router.get("/:id", verifyUser, getUser);
//PATCH-USER PROFILE UPDATE
router.patch("/:id", verifyUser, updateUserValidation(), updateUser);
//Change Password
router.patch("/password", verifyUser, changePassword);
//USER LOGOUT
router.post("/logout", userLogout);
//Reset Password
router.post("/password",resetPassword);

//ADMIN**********************************************************************************

//GET ALL USERS
router.get("/admin/getAllUsers", verifyUser, verifyAdmin, getAllUsers);
//UPDATE USER
router.patch(
  "/admin/updateUser/:id",
  updateUserValidation(),
  verifyUser,
  verifyAdmin,
  updateUserAd
);
//DELETE A USER
router.delete("/admin/deleteUser/:id", verifyUser, verifyAdmin, deleteUser);
module.exports = router;
