var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

/* GET Admin page. */
router.get('/', function (req, res) {
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    
    var taps;
    var coming_soon;
    var beers;

    let taps_sql = "SELECT t.*, b.name FROM taps AS t LEFT JOIN beers AS b ON t.beer_id = b.id ORDER BY t.id";
    let coming_soon_sql = "SELECT c.*, b.name FROM coming_soon AS c JOIN beers AS b ON c.beer_id = b.id ORDER BY c.id";
    let beers_sql = "SELECT b.* FROM beers AS b ORDER BY b.name";
    
    
    db.serialize(() => {
        db.all(taps_sql, [], (err, rows) => {
            if (err) { throw err; }
            taps = rows;
        })
        .all(coming_soon_sql, [], (err, rows) => {
            if (err) { throw err; }
            coming_soon = rows;
        })
        .all(beers_sql, [], (err, rows) => {
            if (err) { throw err; }
            beers = rows;

            res.render('admin', {
                title: 'Beer Board - Administration',
                taps: taps,
                coming_soon: coming_soon,
                beers: beers
            });
        })
    });
    
    db.close();
});

/* POST Save Tap Change */
router.post('/save_tap', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let sql = "UPDATE taps SET beer_id = ? WHERE id = ?";
    let data = [ req.body.beerId, req.body.tapId ];

    db.run(sql, data, function(err){
        if (err) { throw err; }
        res.json({});
        console.log("data written");
    });

    db.close();
});

module.exports = router;