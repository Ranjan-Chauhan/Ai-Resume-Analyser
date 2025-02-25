const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const app = require("./app");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
    app.on("error", () => {
      console.log("app is not able to talk to database ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MONGO db connection Failed !!!", err);
  });
