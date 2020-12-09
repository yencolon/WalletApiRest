const nodemailer = require("nodemailer");

//Sends an email
const sendMail = async (email, subject, msg, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "medianaranjatest@gmail.com",
      pass: "123456mr"
    }
  });

  await transporter.sendMail({
    from: "'Media Naranja' <medianaranjatest@gmail.com>",
    to: email,
    subject: subject,
    text: msg,
    html
  });
};

module.exports = sendMail;
