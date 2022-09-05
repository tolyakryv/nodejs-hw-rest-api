const {
  Contact,
  contactsUpdateStatusSchema,
} = require("../../models/contacts");
const { generationError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { error } = contactsUpdateStatusSchema.validate(req.body);
  if (error) {
    throw generationError(400, "missing field favorite");
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
module.exports = updateStatusContact;
