const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_NAME, MAIL_PASSWORD, MAIL_HOST } = process.env;

const nodemailerConfig = {
  host: MAIL_HOST,
  port: 2525,
  secure: true,
  auth: {
    user: MAIL_NAME,
    pass: MAIL_PASSWORD,
  },
};
const templateEmail = {
  from: MAIL_NAME,
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, ...templateEmail };
    await transporter.sendMail(email);
    console.log("Email send Success");
    return true;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error);
  }
};

// ------------------

// const sendEmail = () => {
//   transporter
//     .sendMail(templateEmail)
//     .then(() => console.log("Email send Success"))
//     .catch((err) => console.log(err.message));
// };

module.exports = sendEmail;
