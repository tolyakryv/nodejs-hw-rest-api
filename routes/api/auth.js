const express = require("express");

const { validationBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const router = express.Router();
router.post(
  "/users/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/users/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/users/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/users/current", authenticate, ctrlWrapper(ctrl.currentUser));

router.patch(
  "/users",
  authenticate,
  validationBody(schemas.updateSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
module.exports = router;
