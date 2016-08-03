var express = require('express');
var app = express();

// GET
app.get('/', userCtrl.index);

// signin
// GET
app.get('/signin', userCtrl.signIn);
// POST
app.post('/signin', userCtrl.signInPost);

// signup
// GET
app.get('/signup', userCtrl.signUp);
// POST
app.post('/signup', userCtrl.signUpPost);

// logout
// GET
app.get('/signout', userCtrl.signOut);

/********************************/

/********************************/
// 404 not found
app.use(userCtrl.notFound404);


