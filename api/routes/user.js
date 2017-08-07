var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'liimex',
    insecureAuth: false
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database", err);
    }
});

exports.register = function (req, res) {
    var today = new Date();
    //save to db
//todo: varbinary vs varchar mysql
    const myPlaintextPassword = req.body.password;
    console.log(myPlaintextPassword);

    var hash = bcrypt.hashSync(myPlaintextPassword, 10);
    console.log(hash);

    var users = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "userid": req.body.userid,
        "password": hash,
        "created": today,
        "modified": today
    }

    connection.query('INSERT INTO Users SET ?', users, function (error) {
        if (error) {
            console.log("An error occurred", error);
            res.send({
                "code": 400,
                "failed": "An error occurred"
            })
        } else {
            res.send({
                "code": 200,
                "success": "The user registered successfully"
            });
        }
    });
}
//TODO: Why two calls are made to /api/register
exports.login = function (req, res) {
    var userid = req.body.userid;
    console.log(req.body.userid);
    var password = req.body.password.trim();
    connection.query('SELECT * FROM Users WHERE userid = "'+ userid+'"', function (error, results, fields) {
            if (error) {
                console.log("An error occurred", error);
                res.send({
                    "code": 400,
                    "failed": "error occurred"
                })
            } else
                console.log(typeof (password));
                console.log(results[0].password, password);
                console.log(bcrypt.compareSync(password, results[0].password));
                if(bcrypt.compareSync(password, results[0].password)){
                    res.send({
                        "code": 200,
                        "success": "Pwd match"
                    });
                }
                else{
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    )
    ;
}
