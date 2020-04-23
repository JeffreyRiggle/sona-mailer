const { SES } = require('aws-sdk');
const ses = new SES({region: 'us-east-1'});

const sendMail = (event, context, callback) => {
    const options = {
        Destination: {
            ToAddresses: [event.toAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: event.html
                }
            },
            Subject: {
                Charset: "UTF-8", 
                Data: event.subject
            }
        },
        Source: event.from
    };
    
    ses.sendEmail(options, (err, data) => {
        callback(null, {err, data});

        if (err) {
            console.log(err);
            context.fail(err);
            return;
        }
    
        context.succeed(event);
    });
};

module.exports = {
    sendMail
};
