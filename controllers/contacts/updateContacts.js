const { Contact, contactUpdateSchema } = require("../../models/contacts");
const { generationError } = require("../../helpers");
const updateContacts = async (req, res) => {
  const contactId = req.params.contactId;
  const { _id: owner } = req.user;
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    throw generationError(400, "missing fields");
  }
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw generationError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = updateContacts;
