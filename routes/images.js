var express = require('express');
var router = express.Router();
var config = require('../config/config');
var sqlite3 = require('sqlite3').verbose();
var multer = require('multer');
var upload = multer({ dest: 'images/uploads/'});

/* GET Images page. */
router.get('/', function (req, res) {
    let db = new sqlite3.Database(config.dbName, (err) => {
        if (err) {
          return console.error(err.message);
        }
    });

    let sql = "SELECT * from config WHERE id = 1";

    db.get(sql, [], (err, row) => {
        if (err) { throw err; }
        var site_config = row;
        res.render("images", { config: site_config });
    })
    db.close();
});

/* POST upload images. */
router.post("/upload", function (req, res) {
    // To be implemented
    res.redirect("/admin/images");
});

module.exports = router;