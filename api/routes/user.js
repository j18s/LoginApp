let bcrypt = require('bcrypt');
let mysql = require('mysql');
let request = require('request');
let fs = require('fs');
let connection = require('../config/dbconnection');

function saveimageurl(id, urlimage) {
    connection.query('UPDATE Users SET url="' + urlimage + '" where id=' + id, function (error) {
        if (error) {
            console.log("An error occurred", error);
        } else {
            console.log("Database updated");

        }
    });
}

exports.setimage = function (req, res) {
    const imgRandomImageUrlGenerator = 'https://api.unsplash.com/photos/random?client_id=1c57555bb86f74273d646892417377cc8f4d0043ab84ddc7e4d3de46f7daf0e5';
    request(imgRandomImageUrlGenerator, function (error, response, body) {
        let json = JSON.parse(body);
        ///
        ///json.id is the random image name retrieved from unsplash.com
        /// We're storing in DB image URL as /images/<json.id>
        ///
        let folderImagePath = './public/images/' + json.id;
        request(json.urls.thumb)
            .on('response', function () {
                saveimageurl(req.params.id, '/images/' + json.id);
                res.send({
                    "code": 200,
                    "message": "Ok pass"
                });
            }).pipe(fs.createWriteStream(folderImagePath));
    });
};

exports.register = function (req, res) {
    let today = new Date();
    //save to db
    const passwd = req.body.password;
    console.log(passwd);

    let hash = bcrypt.hashSync(passwd, 10);
    console.log(hash);

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
