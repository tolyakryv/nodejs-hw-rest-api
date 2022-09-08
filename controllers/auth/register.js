const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { generationError } = require("../../helpers");

const salt = Number(process.env.SALT);

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generationError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

module.exports = register;
