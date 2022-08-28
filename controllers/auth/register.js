const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { generationError } = require("../../helpers");

const salt = Number(process.env.SALT);

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generationError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;
