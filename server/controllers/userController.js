const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "Signup Successful",
    });
  } catch (err) {
    res.status(500).json({
      message: "Signup Failed",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email });
    const isValidPassword = await bcrypt.compare(password, user[0].password);

    if (user && isValidPassword) {
      const token = jwt.sign({ _id: user[0]._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      res.status(200).json({
        access_token: token,
        message: "Login Successful",
      });
    } else {
      res.status(401).json({
        message: "Authorization Failed",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Authorization Failed",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
