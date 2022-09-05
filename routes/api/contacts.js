const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", authenticate, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteContactById));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateContacts));

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
