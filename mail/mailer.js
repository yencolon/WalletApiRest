const mailer = {};

const nodemailer = require('nodemailer');

// Sends an email
mailer.sendMail = (email, subject, msg, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'medianaranjatest@gmail.com',
      pass: '123456mr',
    },
  });

  return transporter.sendMail({
    from: "'Media Naranja' <medianaranjatest@gmail.com>",
    to: email,
    subject: subject,
    text: msg,
    html,
  });
};

module.exports = mailer;
