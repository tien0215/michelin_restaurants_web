const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const authRoute = require("./routes").auth;
const restaurantRoute = require("./routes").restaurant;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
// 連結MongoDB
mongoose
  .connect(process.env.MONGODB_URII)
  .then(() => {
    console.log("Connected to MongoDB Atlas...");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
// restaurant route應該被jwt保護
// 如果request header內部沒有jwt，則request就會被視為是unauthorized
app.use(
  "/api/restaurants",
  passport.authenticate("jwt", { session: false }),
  restaurantRoute
);

app.listen(8080, () => {
  console.log("後端伺服器聆聽在port 8080...");
});
