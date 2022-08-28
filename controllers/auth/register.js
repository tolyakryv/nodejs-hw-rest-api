const { User } = require("../../models/user");
const { generationError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generationError(409, "Email already exist");
  }
  const result = await User.create({ email, password });
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;
