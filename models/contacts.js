const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleErrorSchema } = require("../helpers");

const phoneRegexp = /^[(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{4}$/;
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact, must be exist unique"],
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

contactSchema.post("save", handleErrorSchema);

const Contact = model("contact", contactSchema);

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});
const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp),
}).min(1);
const contactsUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = {
  Contact,
  contactsAddSchema,
  contactsUpdateStatusSchema,
  contactUpdateSchema,
};
