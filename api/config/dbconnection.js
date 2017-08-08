let mysql = require('mysql');

let connection = mysql.createConnection({
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

module.exports = connection;