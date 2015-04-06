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

    connection.query('SELECT * FROM `users` WHERE `id` = ?', id , function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });
    connection.end();
});

router.get('/', function(req, res, next) {
    var connection = DB();

    connection.connect();

    connection.query('SELECT * FROM `users`', function(err, rows, fields) {
        if (err) throw err;

        console.log(rows);
        res.send(rows);
    });

    connection.end();
});

router.post("/",function (req, res) {
    var connection = DB();

    var post = {email: req.body.email , password: req.body.password, name: req.body.name, surname: req.body.surname,
        weight: req.body.weight, height: req.body.height, birthdate: req.body.birthdate};

    connection.query('INSERT INTO `users` SET ?',post, function (error) {
        if (error) {

            console.log(error);
        } else {
            res.send("success");
            console.log('success');

        }
    });
});

router.put("/",function (req, res) {
    var connection = DB();

    var post = {email: req.body.email , name: req.body.name, surname: req.body.surname,
        weight: req.body.weight, height: req.body.height, birthdate: req.body.birthdate};

    connection.query('UPDATE `users` SET ? WHERE email = ?',[post,post.email], function (error) {
        if (error) {

            console.log(error);
        } else {
            res.send("updated");
            console.log('success');

        }
    });
});


router.post("/login",function (req, res) {
    var connection = DB();

    var post = {email: req.body.email , password: req.body.password};

    connection.query('SELECT * FROM `users` WHERE `email`='+ connection.escape(post.email.toString()) + " AND `password`=" + connection.escape(post.password.toString()), function (error,rows,fields) {
        var jsonObj;
        if (error) {
            console.log(error);
            jsonObj = JSON();
            jsonObj = { "response" : "Error in database query"};
            res.send(jsonObj);
        } else {
            if (rows.length == 0) {
                jsonObj = { "response" : "Wrong username or password"};
                res.send(jsonObj);
            }
            else{
                delete rows[0].password;
                rows[0].response = "success";

                res.send(rows[0]);
                console.log('success');
            }
        }
    });
});

module.exports = router;
