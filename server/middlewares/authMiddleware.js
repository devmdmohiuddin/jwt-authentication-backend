const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

const protect = async (req, res, next) => {
  try {

    // const name = "mohi shofi".split(' ')[1]

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.decode(token, process.env.SECRET_KEY)
  
      console.log(decoded)
  
      req.user = await User.findById(decoded._id).select("-password");
      console.log(req.user)
        next();
    }
  } catch (err) {
    next("Authorization failure!")
  }
};

module.exports = {
  protect
}