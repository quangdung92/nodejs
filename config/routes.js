var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/userCtrl');
var messageCtrl = require('../controller/messageCtrl');

// GET
router.get('/', userCtrl.index);

// signin
// GET
router.get('/signin', userCtrl.signIn);
// POST
router.post('/signin', userCtrl.signInPost);

// signup
// GET
router.get('/signup', userCtrl.signUp);
// POST
router.post('/signup', userCtrl.signUpPost);

// logout
// GET
router.get('/signout', userCtrl.signOut);

/********************************/

/********************************/
// 404 not found
router.use(userCtrl.notFound404);
module.exports = router;