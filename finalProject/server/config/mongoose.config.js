const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/"+process.env.DATABASE_NAME)
  .then(() => console.log("Succesfully connected to the database"))
  .catch((err) => console.log("Failed to connect to the database"));