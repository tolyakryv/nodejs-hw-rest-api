const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrlWrapper(ctrl.addContact));

// router.delete("/:contactId", ctrlWrapper(ctrl.deleteContacts));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateContacts));

module.exports = router;
