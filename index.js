const nodemailer = require('nodemailer');
const emailAddress = process.env.USER_EMAIL;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailAddress,
        pass: process.env.USER_PASSWORD
    }
});

const options = {
    from: emailAddress,
    to: '',
    subject: '',
    text: ''
};

transporter.sendMail(options, (err, data) => {
    if (err) {
        console.log('Failed to send email');
    }

    console.log('Email has been sent.');
});
