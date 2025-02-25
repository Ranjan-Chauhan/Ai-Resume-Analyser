const mongoose = require("mongoose");
// const { DB_NAME } = require("../constant");

const connectDB = async () => {
  try {
    connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(
      `\nDB connected Successfully!!✅ DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("DB connection Failed!!! ❌");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
