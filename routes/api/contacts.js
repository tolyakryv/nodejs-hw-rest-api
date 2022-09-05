const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrlWrapper(ctrl.addContact));

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteContactById)
);

router.patch(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateContacts)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
