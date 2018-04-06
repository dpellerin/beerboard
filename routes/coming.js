var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

/* PUT Coming Soon */
router.put('/:id', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let sql = "UPDATE coming_soon SET beer_id = ? WHERE id = ?";
    let data = [ req.body.beerId, req.params.id ];

    db.run(sql, data, function(err){
        if (err) { throw err; }
        res.json({});
    });

    db.close();
});

/* DELETE Coming Soon */
router.delete('/:id', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let sql = "DELETE FROM coming_soon WHERE id = ?";
    let data = [ req.params.id ];
    console.log(data);
    
    db.run(sql, data, function(err){
        if (err) { throw err; }
        res.json({});
    });

    db.close();
});

/* POST Add Coming Soon Entry */
router.post('/', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    let sql = "INSERT INTO coming_soon(number, beer_id) VALUES(1, ?)";
    let data = [ req.body["sel-coming"] ];

    db.run(sql, data, function(err){
        if (err) { 
            throw err; 
        }
        res.redirect("/admin");
    });

    db.close();
});

/* GET New Coming Soon form */
router.get('/new', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let beers_sql = "SELECT * FROM beers ORDER BY brewery_name";

    db.all(beers_sql, [], (err, rows) => {
        if (err) { throw err; }

        res.render('coming_new', {
            title: 'Beer Board - Administration',
            beers: rows
        });
    })

    db.close();
});

module.exports = router;