const { Contact } = require("../../models/contacts");
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "-__v", {
      skip: skip,
      limit: limit,
    }).populate("owner", "email");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "-__v", {
      skip: skip,
      limit: limit,
    }).populate("owner", "email");
    res.json(result);
  }
};
module.exports = getAll;
