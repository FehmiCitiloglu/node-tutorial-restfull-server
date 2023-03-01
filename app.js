const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.wh0bd8s.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8080);
    console.log("db connection successful");
  })
  .catch((err) => {
    console.log("db connection failed");
    console.log(err);
  });
