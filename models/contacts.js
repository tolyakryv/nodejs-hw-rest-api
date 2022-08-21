const { Schema, model } = require("mongoose");
const { handleErrorSchema } = require("../helpers");

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
