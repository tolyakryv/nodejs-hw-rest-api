const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  console.log(contactId);
  const result = data.find((e) => e.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  console.log(contactId);
  const index = data.findIndex((e) => e.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  console.log(contactId);
  const index = data.findIndex((e) => e.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
