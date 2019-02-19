const sgMail = require('@sendgrid/mail');
const sgConfig = require('../config/sendgrid');
const pug = require('pug');

exports.send = async (options) => {
    Object.assign(sgConfig.message, {
        to: options.mail,
        subject: options.subject,
        html: render(options.view, options.data)
    });

    return await sgMail.send(sgConfig.message).catch(e => console.log(e));
};

function render(filename, data) {
    return pug.renderFile(`${__dirname}/../views/emails/${filename}.pug`, data);
}