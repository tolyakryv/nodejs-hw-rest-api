const { Contact } = require("../../models/contacts");
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt", {
    skip: skip,
    limit: Number(limit),
  }).populate("owner", "email");
  res.json(result);
};
module.exports = getAll;
