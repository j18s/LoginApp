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
    ///I have registered an application at Unsplash.com & using their API which gives me random images
    ///client_id is the KEY based authentication
    const imgRandomImageUrlGenerator = 'https://api.unsplash.com/photos/random?client_id=1c57555bb86f74273d646892417377cc8f4d0043ab84ddc7e4d3de46f7daf0e5';
    request(imgRandomImageUrlGenerator, function (error, response, body) {
        let json = JSON.parse(body);
        ///
        ///json.id is the random image name retrieved from unsplash.com
        /// We're storing in DB image URL as /images/<json.id>
        ///
        let folderImagePath = './public/images/' + json.id;

        ///storing small THUMB size image in /public/images folder

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
