var Bookshelf = require('bookshelf');

var config = {
    host: 'localhost',  // your host
    user: 'root', // your database user
    password: 'sa1234', // your database password
    database: 'grooovyChatDB',
    charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
    client: 'mysql',
    connection: config
});

module.exports.DB = DB;