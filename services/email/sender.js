const sgmail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: "email@gmail.com" });
  }
}

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "goitnodejs@meta.ua",
        pass: process.env.PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({ ...msg, from: "email@gmail.com" });
  }
}

module.exports = { CreateSenderNodemailer, CreateSenderSendgrid };
