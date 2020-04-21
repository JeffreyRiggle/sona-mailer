const { SES } = require('aws-sdk');
const ses = new SES({region: 'us-east-1'});

const sendMail = (event, context, callback) => {
    const body = event.body;

    const options = {
        Destination: {
            ToAddresses: [body.toAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: body.html
                }
            },
            Subject: {
                Charset: "UTF-8", 
                Data: body.subject
            }
        },
        Source: body.from
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
