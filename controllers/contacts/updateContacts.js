const contacts = require("../../models/contacts");
const schema = require("../../schemes/contactSchema");
const { generationError } = require("../../helpers");
const updateContacts = async (req, res) => {
  const id = req.params.contactId;
  const { error } = schema.validate(req.body);
  if (error) {
    throw generationError(400, "missing fields");
  }
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw generationError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = updateContacts;
