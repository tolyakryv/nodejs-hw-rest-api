const jwt = require("jsonwebtoken");
const { generationError } = require("../helpers");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(generationError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(generationError(401, "Not authorized"));
    }
    req.user = user;

    // res.status(200).json({
    //   email: user.email,
    //   subscription: user.subscription,
    // });
    next();
  } catch (error) {
    next(generationError(401, error.message));
  }
};
module.exports = authenticate;
