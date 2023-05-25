const nodemailer = require('nodemailer')

function send(type, email, token) {
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

  var text = ""
  var html = ""
  switch (type) {
    case 0:
      text = "Confirme sua conta La Maison acessando o link: http://127.0.0.1:5500/verificacao/index.html?token=" + token
      html = `<p>Sua conta La Maison foi criada com sucesso. Agora só falta <a href='${"http://127.0.0.1:5500/verificacao/index.html?token=" + token}'>VERIFICAR A SUA CONTA</a>!</p>`
      break;
  
    default:
      return
  }

  let mailOptions = {
    from: 'lamaison.suporte@gmail.com',
    to: email,
    subject: 'Confirmação de Conta',
    text: text,
    html: html
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