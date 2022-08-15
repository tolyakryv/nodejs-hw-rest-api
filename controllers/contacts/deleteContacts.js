const contacts = require("../../models/contacts");
const { generationError } = require("../../helpers");
const deleteContacts = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw generationError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteContacts;
