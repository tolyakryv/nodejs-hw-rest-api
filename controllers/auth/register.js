const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
// const nanoid = require("nanoid");
const { v4: uuidv4 } = require("uuid");
const { PORT = 3000 } = process.env;
const { User } = require("../../models/user");
const { generationError, sendEmail } = require("../../helpers");

const salt = Number(process.env.SALT);

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw generationError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, salt);
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "підтвердження реєстрації",
    html: `<a href="http://localhost:${PORT}/api/auth/users/verify/${verificationToken}" 
    target="_blank" >Перейдіть за посилання для підтвердження реєстрації
    <br>http://localhost:${PORT}/api/auth/users/verify/${verificationToken}</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

module.exports = register;
