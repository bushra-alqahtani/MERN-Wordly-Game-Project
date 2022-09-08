require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./server/config/mongoose.config");

const userRoutesFunction = require("./server/routes/user.routes");
userRoutesFunction(app);

const server = app.listen(8000, () =>
  console.log("Our application is running on port 8000")
);
