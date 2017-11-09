var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Beer Board'
    });
});

module.exports = router;