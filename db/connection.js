const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const connectToMongo = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
      console.log("MONG0DB CONNECTED");
    } catch (err) {
      console.log("Error->", err.message);
    }
  };
  module.exports = connectToMongo;