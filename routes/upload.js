const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Upload!' });
  });

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
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
            return
        }
        else {
            console.log(req.file);
        }
    })
});

router.get('/getpic', function(req, res, next){
    res.json({storage})
})

module.exports = router;