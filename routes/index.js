var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

var srmToRgb = function(srm){
    var r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srm))));
    var g = Math.round(Math.min(255, Math.max(0, 245 * Math.pow(0.88, srm))));
    var b = Math.round(Math.min(255, Math.max(0, 220 * Math.pow(0.7, srm))));
    return "rgb(" + r + "," + g + "," + b + ")"
}

/* GET home page. */
router.get('/', function (req, res) {
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let taps_sql = "SELECT t.number AS tap_id, b.* FROM taps AS t LEFT JOIN beers as b ON t.beer_id = b.id";
    let coming_soon_sql = "SELECT c.number AS coming_order, b.* FROM coming_soon AS c JOIN beers as b ON c.beer_id = b.id";
    let config_sql = "SELECT * from config WHERE id = 1";

    db.serialize(() => {
        db.all(taps_sql, [], (err, rows) => {
            if (err) { throw err; }
            taps = rows;
        })
        .get(config_sql, [], (err, row) => {
            if (err) { throw err; }
            site_config = row;
        })
        .all(coming_soon_sql, [], (err, rows) => {
            if (err) { throw err; }
            coming = rows;

            res.render('index', {
                title: 'Beer Board',
                taps: taps,
                coming_soon: coming,
                convertSRM: srmToRgb,
                config: site_config
            });
        });
    });
    db.close();
});

module.exports = router;