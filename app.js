var express       = require('express');
var path          = require('path');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var models        = require('./models');
var config        = require('./config');
var app           = express();
var cors          = require('cors');
var mongo         = require('mongodb');

var server        = app.listen(8810);
var books         = require('./routes/books');
var reminders     = require('./routes/reminders');
var upload        = require('./routes/upload');

const corsOptions = {
  origin: '*',
};

mongoose.connect('mongodb://pedro:beliver@ds111476.mlab.com:11476/jera', {
  useMongoClient: true
  }
);

mongoose.connection.on('connected', () => {
  console.log('Database Connected');
});
mongoose.connection.on('error', (error) => {
  console.log('error to connect', error);
});

app.get('/bookslist', function(req, res, next) {
  res.render('listBooks');
});
app.get('/reminderslist', function(req, res, next) {
  res.render('listReminders');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/books', books);
app.use('/reminders', reminders);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
