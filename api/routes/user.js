var bcrypt = require('bcrypt');
var mysql = require('mysql');
let request = require('request');
let fs = require('fs');

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

function saveimageurl(id, urlimage) {
    console.log(6);

    connection.query('UPDATE Users SET url="' + urlimage + '" where id=' + id, function (error, results) {
        if (error) {
            console.log("An error occurred", error);
        } else {
            console.log("db updated");

        }
    });
}


function writeToFile(fs, urlimage) {
    console.log(10);
    fs.createWriteStream(urlimage)
}

exports.getimage = function (req, res) {
    let url = 'https://api.unsplash.com/photos/random?client_id=1c57555bb86f74273d646892417377cc8f4d0043ab84ddc7e4d3de46f7daf0e5';
    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let json = JSON.parse(body);
        let urlimage = './images/' + json.id;
        request(json.urls.thumb)
            .on('response', function (response) {
                console.log(4);
                saveimageurl(req.params.id, urlimage);
                res.send({
                    "code": 200,
                    "message": "Ok pass"
                });
            }).pipe(fs.createWriteStream(urlimage));
    });
};

exports.readimage = function (req, res) {

    connection.query('select url from users where id=' + req.params.id, function (error, results) {
        fs.readFile(results[0].url, function (err, data) {
            if (err) throw err; // Fail if the file can't be read.

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.

        });
    });

}


exports.register = function (req, res) {
    var today = new Date();
    //save to db
//todo: varbinary vs varchar mysql
    const passwd = req.body.password;
    console.log(passwd);

    var hash = bcrypt.hashSync(passwd, 10);
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
    var psswd = req.body.password.trim();
    connection.query('SELECT * FROM Users WHERE userid = "' + userid + '"', function (error, results) {
            if (error) {
                console.log("An error occurred", error);
                res.send({
                    "code": 400,
                    "failed": "error occurred"
                })
            } else
                console.log(bcrypt.compareSync(psswd, results[0].password));
            if (bcrypt.compareSync(psswd, results[0].password)) {
                res.send({
                    "code": 200,
                    "success": "Pwd match",
                    output: results[0]
                });
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Userid or password is incorrect."
                });
            }
        }
    )
    ;
}
