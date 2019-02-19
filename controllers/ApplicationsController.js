const Application = require('../models/application');
const { check, validationResult } = require('express-validator/check');
const appMailer = require('../mailers/appMailer');

exports.store = async (req, res) => {
    const application = {
        'name': req.body.name,
        'mail': req.body.mail.toLowerCase(),
        'message': req.body.message
    };

    await Application.create(application);

    appMailer.applicationNotify({
        mail: application.mail,
        data: { name: application.name }
    })

    req.flash('form', `${req.body.firstName}: Test`);
    res.redirect('/');
}

exports.validate = [
    check('name').trim().isLength({ min: 1 }).withMessage('Name is required.'),
    check('mail').isEmail().withMessage('Incorrect e-mail.').isLength({ min: 1 }).withMessage('E-mail must be provided'),
    check('message').isLength({ min: 1 }).withMessage('Message is required')
];

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('home', {
            validated: req.body,
            errors: errors.mapped(),
            showLightbox: 'true'
        });
    }

    next();
};

exports.normalizeData = (req, res, next) => {
    const nameArr = req.body.name.split(' ');

    req.body.firstName = nameArr.shift();
    req.body.lastName = nameArr.join(' ');

    next();
}