var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

var srmToRgb = function(srm){
    var r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srm))));
    var g = Math.round(Math.min(255, Math.max(0, 245 * Math.pow(0.88, srm))));
    var b = Math.round(Math.min(255, Math.max(0, 220 * Math.pow(0.7, srm))));
    console.log(r);
    return "rgb(" + r + "," + g + "," + b + ")"
}

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
            rows: rows,
            convertSRM: srmToRgb
        });
    });
    db.close();
});

module.exports = router;