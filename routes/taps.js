var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();

// GET Create Tap
router.get('/new', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    let sql = "INSERT INTO taps (number, beer_id) SELECT CASE WHEN MAX(number) IS NOT null THEN MAX(number) + 1 ELSE 1 END ,'none' FROM taps";

    db.run(sql, function(err){
        if (err) { 
            throw err; 
        }
        res.redirect("/admin");
    });

    db.close();
});

// GET Delete tap
router.get('/rem/:id', function(req, res){
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    db.serialize(function(){

        // Deletes tap
        db.run("DELETE FROM taps WHERE id = ?", req.params.id, function(err){
            if (err) { throw err; }
        })
        // The rest of this code re-numbers the taps. Have to do it this way because 
        // the node.js driver for sqlite3 doesn't allow multiple sql commands in a single string. 
        .run("CREATE TEMP TABLE taporder AS SELECT * from taps ORDER by number", function(err){
            if (err) { throw err; }
        })
        .run("UPDATE taporder SET number = rowid", function(err){
            if (err) { throw err; }
        })
        .run("DELETE FROM taps", function(err){
            if (err) { throw err; }
        })
        .run("INSERT INTO taps SELECT * FROM taporder", function(err){
            if (err) { throw err; }
        })
        .run("DROP TABLE taporder", function(err){
            if (err) { throw err; }

            res.redirect("/admin");
            db.close();
        });
        
    });
    
});

module.exports = router;