var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

// New Beer Form
router.get('/new', function (req, res) {
    res.render('beer_new');
});


// POST Create Beer
router.post('/', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    let sql = "INSERT INTO beers(brewery_name, name, description, style, ibu, srm, abv) VALUES(?,?,?,?,?,?,?)";
    let data = [ 
        req.body["brewery_name"],
        req.body["name"],
        req.body["description"],
        req.body["style"],
        req.body["ibu"],
        req.body["srm"],
        req.body["abv"]
    ];

    db.run(sql, data, function(err){
        if (err) { 
            throw err; 
        }
        res.redirect("/admin");
    });

    db.close();
});

// GET Edit Beer
router.get('/edit/:id', function(req, res){
    console.log('EDIT');
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let sql = "SELECT * FROM beers WHERE id = ?";
    let data = [ req.params.id ];

    db.get(sql, data, (err, row) => {
        if(err) {
            return console.error(err.message);
        }

        res.render('beer_edit', {
            beer: row
        });
    });
});

// POST Save Beer
router.post('/save/:id', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    let sql = "UPDATE beers SET brewery_name=?, name=?, description=?, style=?, ibu=?, srm=?, abv=? WHERE id = ?";
    let data = [ 
        req.body["brewery_name"],
        req.body["name"],
        req.body["description"],
        req.body["style"],
        req.body["ibu"],
        req.body["srm"],
        req.body["abv"],
        req.params.id
    ];

    db.run(sql, data, function(err){
        if (err) { 
            throw err; 
        }
        res.redirect("/admin");
    });

    db.close();
});

// POST Delete Beer
router.get('/delete/:id', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    
    let sql_update_tap = "UPDATE taps SET beer_id = 'none' WHERE beer_id = ?";
    let sql_del_coming = "DELETE FROM coming_soon WHERE beer_id = ?";
    let sql_del_beer = "DELETE FROM beers WHERE id = ?";
    
    let data = [ req.params.id ];

    db.serialize(() => {
        db.run(sql_update_tap, data, function(err){
            if (err) { 
                throw err; 
            }
        })
        .run(sql_del_coming, data, function(err){
            if (err) { 
                throw err; 
            }
        })
        .run(sql_del_beer, data, function(err){
            if (err) { 
                throw err; 
            }
            res.redirect("/admin");
        })
    });

    db.close();
});

module.exports = router;