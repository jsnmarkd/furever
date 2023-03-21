var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registerRouter = require('./routes/register')
const dogsRouter = require('./routes/dogs');
const mediaRouter = require('./routes/dog_media');
const likesRouter = require('./routes/likes');
const contentsRouter = require('./routes/contents');
var app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/dogs', dogsRouter);
app.use('/media', mediaRouter);
app.use('/likes', likesRouter);
app.use('/contents', contentsRouter);
module.exports = app;

