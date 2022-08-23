const { isObjectIdOrHexString } = require("mongoose");
const { generationError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isObjectIdOrHexString(contactId);
  console.log(isCorrectId);
  if (!isCorrectId) {
    const error = generationError(400, `${contactId} is not correct id format`);
    next(error);
  }
  next();
};
module.exports = isValidId;
