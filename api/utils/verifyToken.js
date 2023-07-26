const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "Not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(createError(403, "Token not valid"));
    //   creating a variable called user in our response and setting it equal to payload
      req.user = user;
      next();
    });
}
const verifyUser = (req, res, next) => {
    // verify if token is valid, and if valid, if the user is the account owner or admin to perform the action
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next ,() => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
module.exports = { verifyToken, verifyUser, verifyAdmin };