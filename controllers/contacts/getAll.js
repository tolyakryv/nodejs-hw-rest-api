const { Contact } = require("../../models/contacts");
const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};
module.exports = getAll;
