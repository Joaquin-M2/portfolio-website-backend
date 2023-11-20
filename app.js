const requestsLogger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const iconsRoutes = require("./api/routes/icons");
const tagsRoutes = require("./api/routes/tags");
const toolsRoutes = require("./api/routes/tools");
const usersRoutes = require("./api/routes/users");

// DATABASE CONNECTION

mongoose.connect(
  `mongodb+srv://Joaquin-M2:${process.env.MONGODB_ATLAS_PASSWORD}@portfolio-website.fbtspv2.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

// MIDDLEWARES

app.use(requestsLogger("dev"));
app.use("/uploads", express.static("uploads")); // Makes a folder publicly available.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////// Dealing with CORS errors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // The second argument can be the domain of our frontend (https......com) so the rest of domains receive a CORS error.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// ENDPOINTS

app.use("/icons", iconsRoutes);
app.use("/tags", tagsRoutes);
app.use("/tools", toolsRoutes);
app.use("/user", usersRoutes);

// ERROR HANDLING FOR INVALID REQUESTS

app.use((req, res, next) => {
  const error = new Error("HALT!1!! This is an error.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
