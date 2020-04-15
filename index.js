const nodemailer = require('nodemailer');
const emailAddress = process.env.USER_EMAIL;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailAddress,
        pass: process.env.USER_PASSWORD
    }
});

const sendMail = (event, context, callback) => {
    const body = JSON.parse(event.body);

    const options = {
        from: emailAddress,
        to: body.toAddress,
        subject: body.subject,
        text: body.body
    };
    
    transporter.sendMail(options, (err, data) => {
        if (err) {
            callback(Error('Failed to send mail'));
            return;
        }
    
        callback(null, 200);
    });
};

module.exports = {
    sendMail
};
