const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const router = express.Router();
router.post("/register", ctrlWrapper(ctrl.register));

module.exports = router;
