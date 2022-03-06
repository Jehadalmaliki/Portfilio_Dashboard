const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user-routers');
const passport=require('passport');
const passportSetup=require('./config/passport-setup');
// const { session } = require('passport');
const session =require('express-session')

const app = express();


// view engine setup
app.set('view engine', 'ejs');
app.use(express.static('views/pages'));
app.use(express.static('public/upload'));
// session and flash
app.use(session({
  secret: 'lorem ipsum',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 15}
}))
app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());

// bring passport
app.use(passport.initialize())
app.use(passport.session())

// store user object
app.get('*', (req,res,next)=> {
  res.locals.user = req.user || null
  next()
})
app.use('/', indexRouter);
app.use('/user',  userRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});



module.exports = app;
