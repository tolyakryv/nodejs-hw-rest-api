const express = require("express");

const { validationBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const router = express.Router();
router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
