var DB = require('../db').DB;

var User = DB.Model.extend({
    tableName: 'users',
    idAttribute: 'id',
    messages: function() {
        return this.hasMany(Message);
    }
});

module.exports = {
    User: User
};

