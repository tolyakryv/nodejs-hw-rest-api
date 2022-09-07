const { User } = require("../../models/user");
const { generationError } = require("../../helpers");
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  if (!req.user) {
    generationError(401, "Not authorized");
  }
  const result = await User.findOneAndUpdate({ _id }, req.body, {
    new: true,
  });
  res.status(200).json({
    email: result.email,
    subscription: result.subscription,
  });
};
module.exports = updateSubscription;
