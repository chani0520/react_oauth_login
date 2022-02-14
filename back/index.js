require("dotenv").config();
const express = require("express");
const api = require("./api");
const passport = require("passport");
const passportConfig = require("./passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", api);

const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
