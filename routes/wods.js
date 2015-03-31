/**
 * Created by Jacopo on 30/03/2015.
 */
var express = require('express');
var mysql = require('mysql');


var router = express.Router();

function DB() {
    return mysql.createConnection({
        host: 'localhost',user: 'root', password: 'jaco91',database:'test'
    });
}

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    var connection = DB();

    connection.connect();
    connection.query('SELECT * FROM `wods` where `id` = ?', id , function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });
    connection.end();
});

router.get('/', function(req, res, next) {
    var connection = DB();

    connection.connect();
    connection.query('SELECT * FROM wods', function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });

    connection.end();
});

module.exports = router;