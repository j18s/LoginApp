let express = require("express");
let path = require('path');
let bodyParser = require('body-parser');
let login = require('./routes/user');
let imageHandler = require('./routes/image');


let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.resolve('./public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let router = express.Router();

// test route
router.get('/', function (req, res) {
    res.json({message: 'welcome to our upload module apis'});
});

//route to handle user registration
router.post('/register', login.register);
router.post('/login',login.login);
router.post('/setimage/:id',imageHandler.setimage);
// router.get('/readimage/:id',login.readimage);

app.use('/api', router);
app.listen(4000);
console.log('started ...');