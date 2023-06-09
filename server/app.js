var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const cors = require('cors');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registerRouter = require('./routes/register')
const mediaRouter = require('./routes/dog_media');
const likesRouter = require('./routes/likes');
const contentsRouter = require('./routes/contents');
const loginRouter = require('./routes/login');
const dogsRouter = require('./routes/dogs');
const memorialRouter = require('./routes/memorial');
const carouselRouter = require('./routes/carousels')

const commentsRouter = require('./routes/comments');
var app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/memorial', memorialRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/dogs', dogsRouter);
app.use('/media', mediaRouter);
app.use('/likes', likesRouter);
app.use('/contents', contentsRouter);
app.use('/login', loginRouter);
app.use('/comments', commentsRouter);
app.use('/carousels', carouselRouter);
module.exports = app;

