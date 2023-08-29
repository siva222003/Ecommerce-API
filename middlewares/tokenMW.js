const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/userModel');
//MIDDLEWARE FOR CHECKING WHETHER THE TOKEN IS PRESENT AND VALID AND NOT EXPIRED
const verifyUser =  (req, res, next) => {
  const webToken = req.headers.auth;
  if (!webToken)
    return res.status(400).json({ error: "Couldn't find the token" });
  jwt.verify(webToken, JWT_SECRET, async (err, decoded) => {
    if (err) {
      // Token is invalid or expired
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
      }
      return res
        .status(401)
        .json({ message: "Invalid token. Please provide a valid token." });
    }
    req.id = decoded.id;
    const _id = req.id;
    const userTokens = await User.findById({_id}).select("revokedTokens");
    if(!userTokens){
      res.status(404).json({"error" : "User not found"});
    }
    
    const revokedToken = userTokens.revokedTokens.find((item)=>item.token===webToken);
    if(revokedToken){
      res.status(400).json({"error" : "Token is Revoked"});
    }
    next();
  });
};
//MIDDLEWARE FOR VERIFYING ADMIN
const verifyAdmin = async (req,res,next)=>
{
     const _id = req.id;
     const admin = await User.findById({_id}).select("-password");
     if(!admin){
      res.status(400).json({"error" : "couldn't find the user"});
     }
     if(admin.role !== "admin"){
      res.status(400).json({"error" : "you have no access"});
     }
     next();
}

module.exports = {verifyUser,verifyAdmin};
