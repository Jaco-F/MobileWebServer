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
/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    var connection = DB();

    connection.connect();

    connection.query('SELECT * FROM `new_table` WHERE `id` = ?', id , function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });
    connection.end();
});

router.get('/', function(req, res, next) {
    var connection = DB();

    connection.connect();

    connection.query('SELECT * FROM `gyms`', function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });

    connection.end();
});

router.post("/",function (req, res) {
    var connection = DB();

    // var post = {name: req.params.name};

    connection.query('INSERT INTO `gyms` SET ?',{name:req.params.name}, function (error) {
        if (error) {

            console.log(error);
        } else {
            console.log('success');

        }
    });
});

module.exports = router;
