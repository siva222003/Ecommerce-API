const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    revokedTokens :[
      {
          token : String
      }
    ],
    resetPasswordToken: String,
  });
  const User = mongoose.model('User',UserSchema);
  
  module.exports = User;