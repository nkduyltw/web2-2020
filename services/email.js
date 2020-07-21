const nodemailer = require('nodemailer');

async function send(to, subject, content){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME || 'nkduy17ck1@gmail.com',
          pass: process.env.EMAIL_PASSWORD || '827276Duy',
        }
      });
      
      return transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text : content,
      });
}

module.exports={ send };