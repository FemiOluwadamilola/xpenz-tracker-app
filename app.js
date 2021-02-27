const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const Router = require('./routes/index.js');
const userRouter = require('./routes/user.js');
const expenseRouter = require('./routes/expense.js');
const db = require('./config/keys.js');
const passport = require('passport');


// passport config
require('./config/passport')(passport);

const app = express();

// DB config/connect to mongo
const dbConfig = db.mongoURI;
// mongoose.set(' useUnifiedTopology', true)

mongoose.connect(dbConfig, { useUnifiedTopology:true, useNewUrlParser: true,useFindAndModify:false })
.then(() => console.log('mongoDB Connected...'))
.catch(err => console.log(err));

//setting template engine(EJS)
app.use(expressLayouts);
app.set('view engine','ejs');

// public folder
app.use(express.static(path.join(__dirname,'public')));

// Bodyparse
app.use(express.urlencoded({extended:false}));

// express-session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

// Global vars
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/',Router);
app.use('/user',userRouter);
app.use('/expense',expenseRouter);

// middleware for single user data
// app.use(getUserData);


// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`app running on http://localhost:${PORT}`);
})