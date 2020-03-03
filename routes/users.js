var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// create sheet
router.get('/create', function(req, res, next) {
    userDao.create(req, res, next);
});

// drop sheet  Attention please!！！！
router.get('/drop', function(req, res, next) {
    userDao.drop(req, res, next);
});
// add user
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});
router.get('/addUserMiddle', function(req, res, next) {
    res.render('addUser',{
        title:'Add user'
    });
});
// see all the users
router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});

module.exports = router;