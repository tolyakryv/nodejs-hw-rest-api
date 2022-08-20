const { Schema, model } = require("mongoose");
const {handleErrorSchema}= require("../helpers")
const phoneRegexp = /^[(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required, must be exist unique"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleErrorSchema);

const Contact = model("contact", contactSchema);

const Joi = require("joi");
const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

module.exports = { Contact, contactsAddSchema };
// ----------
// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (contactId) => {
//   const data = await listContacts();
//   console.log(contactId);
//   const result = data.find((e) => e.id === contactId);
//   return result || null;
// };

// const removeContact = async (contactId) => {
//   const data = await listContacts();
//   console.log(contactId);
//   const index = data.findIndex((e) => e.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = data.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//   return result;
// };

// const addContact = async ({ name, email, phone }) => {
//   const data = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   data.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//   return newContact;
// };

// const updateContact = async (contactId, { name, email, phone }) => {
//   const data = await listContacts();
//   console.log(contactId);
//   const index = data.findIndex((e) => e.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   data[index] = { id: contactId, name, email, phone };
//   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//   return data[index];
// };

// module.exports = {
//   listContacts,
// getContactById,
// removeContact,
// addContact,
// updateContact,
// };
