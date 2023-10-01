const mongoose = require("mongoose");
const colors = require("colors");

// connect to mongodb
const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/expressjs");

    console.log(`connect to mongodb ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`mongo db error ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDb;
