const { Contact } = require("../../models/contacts");
const { generationError } = require("../../helpers");
const deleteContacts = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.removeContact(id);
  if (!result) {
    throw generationError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = deleteContacts;
