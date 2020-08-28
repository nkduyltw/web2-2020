const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
});

async function send(to, subject, content) {
    

    return transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text: content,
    });
}

module.exports = { send };