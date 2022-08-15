const contacts = require("../../models/contacts");
const { generationError } = require("../../helpers");
const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw generationError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = getById;
