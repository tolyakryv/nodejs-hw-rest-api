const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addContacts);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId", ctrl.updateContacts);

module.exports = router;
