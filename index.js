const nodemailer = require('nodemailer');

const sendMail = (event, context, callback) => {
    const body = event.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: body.from,
            pass: body.fromPass
        }
    });

    const options = {
        from: body.from,
        to: body.toAddress,
        subject: body.subject,
        html: body.html
    };
    
    transporter.sendMail(options, (err, data) => {
        if (err) {
            callback(Error('Failed to send mail'));
            return;
        }
    
        callback(null, 200);
        transporter.close();
    });
};

module.exports = {
    sendMail
};
