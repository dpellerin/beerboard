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
    
    var beers;
    var taps;

    let beers_sql = "SELECT b.* FROM beers AS b ORDER BY b.name";
    let taps_sql = "SELECT t.*, b.name FROM taps AS t JOIN beers AS b ON t.beer_id = b.id ORDER BY t.id"
    
    db.serialize(() => {
        db.all(beers_sql, [], (err, rows) => {
            if (err) { throw err; }
            beers = rows;
        })
        .all(taps_sql, [], (err, rows) => {
            if (err) { throw err; }
            taps = rows;

            res.render('admin', {
                title: 'Beer Board - Administration',
                beers: beers,
                taps: taps
            });
        });
    });
    
    db.close();
});

/* GET Edit Beer Form */
router.get('/edit_beer/:id', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    let sql = "SELECT * FROM beers WHERE id=" + req.params.id;
    db.get(sql, [], (err, row) => {
        if (err) { throw err; }

        res.render('edit_beer', {
            title: 'Beer Board - Administration',
            beer: row
        });
    })
    db.close();
});

/* POST Save Beer Form */
router.post('/save_beer', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    let sql = "UPDATE beers SET brewery_name = ?, name = ?, description = ?, style = ?, ibu = ?, srm = ?, abv = ? WHERE id = ?";
    let data = [
        req.body.brewery_name, 
        req.body.name,
        req.body.description,
        req.body.style,
        req.body.ibu,
        req.body.srm,
        req.body.abv,
        req.body.beer_id
    ];
    db.run(sql, data, function(err){
        if(err) {

        }
        db.close();
        res.redirect("/admin");
    });
});

module.exports = router;