const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleErrorSchema } = require("../helpers");

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

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleErrorSchema);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
});
const schema = { registerSchema };

const User = model("user", userSchema);
module.exports = {
  User,
  schema,
};
