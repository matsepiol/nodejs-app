const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const message = {};
message.from = 'matsepiol@interia.pl';
message.mail_settings = {
    sandbox_mode: {
        enable: true
    }
};

exports.message = message;