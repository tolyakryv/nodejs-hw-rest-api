const { Contact, contactsAddSchema } = require("../../models/contacts");
const { generationError } = require("../../helpers");
const updateContacts = async (req, res) => {
  const id = req.params.contactId;
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw generationError(400, "missing fields");
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw generationError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = updateContacts;
