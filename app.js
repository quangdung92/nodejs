// vendor libraries
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// custom libraries
// routes
var route = require('./route');
// model
var Model = require('./model');

var app = express();
var http = require('http').Server(app);

passport.use(new LocalStrategy(function(username, password, done) {
    new Model.User({username: username}).fetch().then(function(data) {
        var user = data;
        if(user === null) {
            return done(null, false, {message: 'Invalid username or password'});
        } else {
            user = data.toJSON();
            if(!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: 'Invalid username or password'});
            } else {
                return done(null, user);
            }
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    new Model.User({username: username}).fetch().then(function(user) {
        done(null, user);
    });
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// cookie: { maxAge: 60000 },
app.use(session({secret: 'SURIMA',resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

// GET
app.get('/', route.index);

// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// signup
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);

/********************************/

/********************************/
// 404 not found
app.use(route.notFound404);

// Socket io
var io = require('socket.io')(http);
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

// Check connect
http.listen(3000, function(){
    console.log('listening on *:3000');
});

// app.set('port', process.env.PORT || 3002);
// var server = app.listen(app.get('port'), function(err) {
//     if(err) throw err;
//
//     var message = 'Server is running @ http://localhost:' + server.address().port;
//     console.log(message);
// });


