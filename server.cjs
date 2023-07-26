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
