const User = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.signup = async function (req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.login = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    if(!correctPassword) {
        return res.sendStatus(400)
    }
    res.json("login sucssufly")

    // const payload = {
    //     userId: user.id
    // }
    // const secretKey = process.env.JWT_SECRET_KEY
    // const token = jwt.sign(payload, secretKey)

    // res.status(400).json({userToken: token})

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
};

module.exports.getAllUsers = async function(req, res) {
    console.log(req.userId)
    const users = await User.find();
    res.json(users)
}
