const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://slamg:slamg@cluster0.xubbn.mongodb.net/');
    console.log(`mongo connected: ${conn.connection.host}`);
  };
// this is a copy pase .. only add mongoose username and password for cluster
  module.exports = connectDB;