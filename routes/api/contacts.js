const express = require("express");
const contacts = require("../../models/contacts");

const Joi = require("joi");
const router = express.Router();
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw new Error();
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
