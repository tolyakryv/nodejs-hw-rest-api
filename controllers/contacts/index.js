const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./addContacts");
const deleteContactById = require("./deleteContacts");
const updateContacts = require("./updateContacts");
const updateStatusContact = require("./updateStatusContact");
module.exports = {
  getAll,
  getById,
  addContact,
  deleteContactById,
  updateContacts,
  updateStatusContact,
};
