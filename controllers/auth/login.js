// const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { generationError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw generationError(401, "Email or password is wrong");
  }
  const comparePassword = await user.validPassword(password);
  //   const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw generationError(401, "Not authorized");
  }
  const token = "qweqt216wuyquyewqwyu";
  res.json({ token });
};
module.exports = login;
