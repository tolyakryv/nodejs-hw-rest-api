const { Contact } = require("../../models/contacts");
const { generationError } = require("../../helpers");
const getById = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const id = req.params.contactId;
    const result = await Contact.findOne({ id, owner });

    if (!result) {
      throw generationError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
