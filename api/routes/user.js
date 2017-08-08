let bcrypt = require('bcrypt');
let request = require('request');
let connection = require('../config/dbconnection');

exports.register = function (req, res) {
    let today = new Date();
    ///
    ///We're using BCRYPT algorithm to store encrypted password in the database.
    ///
    const passwd = req.body.password;
    let hash = bcrypt.hashSync(passwd, 10);
    let users = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "userid": req.body.userid,
        "password": hash,
        "created": today,
        "modified": today
    };


    connection.query('INSERT INTO Users SET ?', users, function (error, fields) {
        if (error) {
            console.log("An error occurred", error);
            res.send({
                "code": 400,
                "failed": "An error occurred"
            })
        } else {
            res.send({
                "code": 200,
                "output": fields,
                "success": "The user registered successfully"
            });
        }
    });
};

exports.login = function (req, res) {
    let userid = req.body.userid;
    let psswd = req.body.password.trim();
    connection.query('SELECT * FROM Users WHERE userid = "' + userid + '"', function (error, results) {
            console.log(results);
            if (error) {
                console.log("An error occurred", error);
                res.statusCode=400;
                res.send({
                    "code": 400,
                    "failed": "error occurred"
                })
            } else if (results.length > 0 && bcrypt.compareSync(psswd, results[0].password)) {
                res.statusCode=200;
                res.send({
                    "code": 200,
                    "success": "Record found.",
                    output: results[0]
                });
            }
            else {
                res.statusCode=401;
                res.send({
                    "code": 401,
                    "success": "Userid or password is incorrect."
                });
            }
        }
    )
    ;
};
