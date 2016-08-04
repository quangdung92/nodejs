// model
var Model = require('../model/message');
var app = require('../app');
// create
var create = function (req, res, next) {
    var io = app.io;
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    }else {
        var user = req.user;
        var msg = req.body.m;
        var stat = "";
        var createMsg = new Model.Message({user_id: user.id, content: msg});
        var a = createMsg.save();
        res.render('index', {title: 'Home', user: user, stat: stat});
    }
};

module.exports.create = create;
