const { Contact, contactsAddSchema } = require("../../models/contacts");
const { generationError } = require("../../helpers");
const addContact = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw generationError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
module.exports = addContact;
