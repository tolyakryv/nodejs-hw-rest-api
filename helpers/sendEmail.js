const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_NAME, MAIL_PASSWORD, MAIL_RECEIVER } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_NAME,
    pass: MAIL_PASSWORD,
  },
};
const templateEmail = {
  to: MAIL_RECEIVER,
  from: MAIL_NAME,
  subject: "test",
  html: "test_mail",
};

const transporter = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//   try {
//     const email = { ...data, ...templateEmail };
//     await transporter.sendMail(email);
//     return true;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// ------------------

const sendEmail = () => {
  transporter
    .sendMail(templateEmail)
    .then(() => console.log("Email send Success"))
    .catch((err) => console.log(err.message));
};

module.exports = sendEmail;
