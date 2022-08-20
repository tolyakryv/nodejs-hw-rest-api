const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

// router.get("/:contactId", ctrl.getById);

router.post("/", ctrlWrapper(ctrl.addContact));

// router.delete("/:contactId", ctrlWrapper(ctrl.deleteContacts));

// router.put("/:contactId", ctrlWrapper(ctrl.updateContacts));

module.exports = router;
