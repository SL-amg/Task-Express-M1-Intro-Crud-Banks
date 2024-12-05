const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://slamg:YxEhQycTnIHVzEqC@cluster0.xubbn.mongodb.net/');
    console.log(`mongo connected: ${conn.connection.host}`);
  };

  module.exports = connectDB;