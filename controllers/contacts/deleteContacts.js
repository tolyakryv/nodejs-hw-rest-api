const { Contact } = require("../../models/contacts");
const { generationError } = require("../../helpers");
const deleteContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw generationError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = deleteContactById;
