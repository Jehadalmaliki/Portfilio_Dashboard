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
// session and flash
app.use(session({
  secret:'lorem ipusm',
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:60000*15}
}))
app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static('views/pages'));
app.use(express.static('public/upload'));

app.use('/', indexRouter);
app.use('/user',  userRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});
// bring passport
app.use(passport.initialize())
app.use(passport.session())

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// store user object
// app.get('*',(req,res,next)=>{
//   res.locals.user=req.user || null
//   next()
// })
module.exports = app;
