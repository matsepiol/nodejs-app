const bookshelf = require('../config/bookshelf');

const Application = bookshelf.Model.extend({
    tableName: 'application'
});

module.exports.create = (application) => {
    return new Application({
        name: application.name,
        phone: application.mail,
        message: application.message
    }).save();
}