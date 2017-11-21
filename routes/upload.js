const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

router.get('/', function (req, res, next) {
    res.render('book');
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb) {
        checkFile(file, cb);
    }
}).single('picture');

function checkFile(file, cb) {
    const files = /jpeg|jpg|png|/;
    const ext = files.test(path.extname(file.originalname).toLowerCase());
    const mime = files.test(file.mimetype);
    if (mime && ext) {
        return cb(null, true);
    }
    else {
        return res.json({message: 'file extension not suported'})
    }
}

router.post('/', function(req, res){
    upload(req, res, function(err){
        if (err) {
            return console.log(err);
        }
        else {
            return;
        }
    })
});

router.get('/getpic/:name', function(req, res, next){
    const name = req.params.name;
    const files = fs.readdirSync('/Users/pedroaugusto/Documents/jera/book-reminder/public/uploads');
    files.forEach((file) => {
        if (file == name) {
            console.log(file);
            res.end(file);
        }
    });
})

module.exports = router;