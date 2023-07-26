const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.status(201).send(`User created: ${savedUser}`);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) return next(createError(400, "Invalid Password or Username"));

    // jwt
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // removing password and isAdmin
    const {password, isAdmin, ...otherDetails} = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, //cookie can only be accessed by the server and is not accessible to JavaScript running in the client's browser. This is a security measure to protect the cookie from potential cross-site scripting (XSS) attacks.
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
