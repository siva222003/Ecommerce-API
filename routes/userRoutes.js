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
router.post("/userLogin", loginUserValidation(), userLogin);
//GET-USER DETAILS
router.get("/userDetails/:id", verifyUser, getUser);
//PATCH-USER PROFILE UPDATE
router.patch("/updateUser/:id", verifyUser, updateUserValidation(), updateUser);
//Change Password
router.patch("/updatePassword", verifyUser, changePassword);
//USER LOGOUT
router.post("/userLogout", (req, res) => {});
//Reset Password
router.post("/resetPassword", (req, res) => {});

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
