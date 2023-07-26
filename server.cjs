// // import express from "express";

// const express = require("express");

// const app = express();
// const PORT = 3000;

// // app.use(express.static("./dist/"));
// app.use(express.static("public"));
// app.use("/static", express.static("static"));

// app.listen(PORT, function () {
//   console.log(`My chat app started on port ${PORT}!`);
// });

// Requiring module
const express = require("express");

// Creating express object
const app = express();

// Defining port number
const PORT = 3000;

// Function to serve all static files
// inside public directory.
app.use(express.static("./dist/"));
app.use("/static", express.static("static"));

// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
});
