var DB = require('../db').DB;

var Message = DB.Model.extend({
    tableName: 'messages',
    idAttribute: 'id',
    user: function() {
        return this.belongsTo(User,'user_id');
    },
});

module.exports = {
    Message: Message
};

