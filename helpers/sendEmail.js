const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAILTRAP_USER, MAILTRAP_RASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_RASSWORD,
  },
});

const sendEmail = async (data) => {
  const email = { ...data, from: MAILTRAP_USER };
  await transport.sendMail(email);
};

module.exports = sendEmail;
