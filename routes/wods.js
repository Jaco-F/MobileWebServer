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

router.get('/:id/exercises', function(req, res, next) {
    var connection = DB();
    var wod_id = req.params.id;

    connection.connect();
    connection.query('SELECT we.id_wod,we.id_exercise,e.name,e.equipment,we.rounds,we.reps,we.rest_time,we.weight,we.duration,e.icon_id ' +
    'FROM exercises AS e JOIN wods_exercises AS we ON e.id = we.id_exercise WHERE we.id_wod =' + connection.escape(wod_id) , function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });

    connection.end();
});

router.get('/user/:email', function(req, res, next) {
    var connection = DB();
    var email = req.params.email;
    connection.connect();
    connection.query('SELECT wod_name,gym_name,wods.id FROM wods JOIN gyms ON wods.id_gym = gyms.id WHERE wods.id_user = ' +
    '(SELECT id FROM users WHERE email = ' + connection.escape(email) + ')' , function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });

    connection.end();
});

module.exports = router;