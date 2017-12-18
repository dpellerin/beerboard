var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function (req, res) {
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let sql = "SELECT t.number AS tap_id, b.* FROM taps AS t JOIN beers as b ON t.beer_id = b.id";

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', {
            title: 'Beer Board',
            rows: rows
        });
    });

    db.close();
});

module.exports = router;