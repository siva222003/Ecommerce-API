const User = require("../models/userModel");
const { validationResult } = require("express-validator");
//ADMIN --- GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const response = await User.find({}).select("-password");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//ADMIN --- UPDATE USER(ROLE)
exports.updateUserAd = async (req,res) => {
  try {
    // Validations Error Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // User checking
    const { id } = req.params;
    const result = await User.findOne({ _id: id });
    if (!result) return res.status(400).json({ error: "User Doesn't exist" });

    //Updating User
    const updatedFields = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};

//ADMIN --- DELETE USER
exports.deleteUser = async (req,res)=>
{
    try{
        const { id } = req.params;
        const result = await User.findOne({ _id: id });
        if (!result) return res.status(400).json({ error: "User Doesn't exist" });
        const response = await User.findByIdAndDelete({_id : id});
        res.status(200).json({"message" : "user deleted successfully",response});
    }catch(error){
        console.error(error);
      res.status(500).json({ error: "An error occurred." }); 
    }
}