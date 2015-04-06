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

router.get('/user/:email', function(req, res, next) {
    var connection = DB();
    var email = req.params.email;

    connection.connect();
    connection.query('SELECT we.id_wod,we.id_exercise,w.wod_name,g.gym_name,e.name AS name_exercise,e.equipment,we.rounds,we.reps,we.rest_time,we.weight,we.duration,e.icon_id,we.category ' +
    'FROM ((exercises AS e JOIN wods_exercises AS we ON e.id = we.id_exercise) JOIN wods AS w ON w.id = we.id_wod) JOIN gyms as g ON g.id=w.id_gym' +
    ' WHERE w.id_user =' +
    '(SELECT id FROM users WHERE email = ' + connection.escape(email) + ')', function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });

    connection.end();
});

module.exports = router;