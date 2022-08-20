const contacts = require("../../models/contacts");
const schema = require("../../schemes/contactSchema");
const { generationError } = require("../../helpers");
const addContacts = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw generationError(400, "missing required name field");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
module.exports = addContacts;
