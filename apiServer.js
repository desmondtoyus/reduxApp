var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//API
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
let db = mongoose.connection;
db.on('errror', function () {
    console.log('DB connection Error');
});
// ------------->>> SET UP SESSION<<<<<-------------------
app.use(session({
    secret: 'mySecretString',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })

}))
// --------->>>>> SAVE TO SESSION  API<<<<-----------------------
app.post('/cart', function (req, res) {
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function (err) {
        if (err) {
            throw err;
        }
        res.json(req.session.cart);
    })

})

// --------->>>>> GET SESSION  API<<<<-----------------------
app.get('/cart', function (req, res) {
    if (typeof req.session.cart !== 'undefined') {
        res.json(req.session.cart);
    }

})

// ------------->>> END SESSION <<<<< -------------------

var Books = require('./models/books.js');
// -----> POST BOOKS <<<-------
app.post('/books', function (req, res) {
    var book = req.body;

    Books.create(book, function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books)
    })

});
// ---------->>>GET METHODS <<<<------
app.get('/books', function (req, res) {
    Books.find(function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books)

    })

});
// ---------->>>DELETE METHODS <<<<------
app.delete('/books/:_id', function (req, res) {
    let query = { _id: req.params._id };
    Books.remove(query, function (err, books) {
        if (err) {
            throw err;

        }
        res.json(books);
    })

});

app.put('/books/:_id', function (req, res) {
    let book = req.body;
    var query = req.params._id;
    var update = {
        '$set': {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price
        }
    };
    var option = { new: true };

    Books.findOneAndUpdate(query, update, option, function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books)

    })
})
// ---------->>>>>>GET BOOKS IMAGES <<<----------

app.get('/images/', function (req, res) {
    const imgFolder = __dirname + '/public/images/';
    const fs = require('fs');
    fs.readdir(imgFolder, function (err, files) {
        if (err) {
            return console.log(err);
        }
        const filesArr = [];
        files.forEach(function (file) {
            filesArr.push({ name: file });
        })
        res.json(filesArr)
    })

})

//  ---------->>>>>>GET BOOKS IMAGES <<<----------

    //END API

    app.listen(3001, function (err) {
        if (!err) {
            console.log("listing on port", 3001)

        }
        console.log(err);
    })