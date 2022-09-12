const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { handleErrorSchema } = require("../helpers");

const subscriptionType = ["starter", "pro", "business"];
const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    avatarURL: String,
    subscription: {
      type: String,
      enum: subscriptionType,
      default: "starter",
    },
    token: String,
    default: "",
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleErrorSchema);

userSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  // repeat_password: Joi.ref("password"),
  subscription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const updateSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string().pattern(emailRegexp),
  subscription: Joi.string().valid(...subscriptionType),
}).or("email", "password", "subscription");
const schemas = { registerSchema, loginSchema, updateSchema };

const User = model("user", userSchema);
module.exports = {
  User,
  schemas,
};
