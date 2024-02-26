const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect to MongoDb database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB server error &{error}`);
  }
};

module.exports = connectDB;
