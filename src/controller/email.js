const nodemailer = require('nodemailer')

function send() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,

      pass: process.env.MAIL_PASSWORD,

      clientId: process.env.OAUTH_CLIENTID,

      clientSecret: process.env.OAUTH_CLIENT_SECRET,

      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  console.log({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,

      pass: process.env.MAIL_PASSWORD,

      clientId: process.env.OAUTH_CLIENTID,

      clientSecret: process.env.OAUTH_CLIENT_SECRET,

      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  })

  let mailOptions = {
    from: 'lamaison.suporte@gmail.com',
    to: 'guihenrique2806@gmail.com',
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project',
    html: '<h1>Teste</h1>'
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = { send }