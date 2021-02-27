const express = require('express');
const passport = require('passport');
const router = express.Router();
const {createUser,createExpenses, forgetPasswordHandler} = require('../controllers/user.js');
const User = require('../models/User.js');
// Login page
router.get('/login', (req,res) => res.render('login'))

// Register page
router.get('/register', (req,res) => res.render('register'));

// forget password page
router.get('/forgetPassword', (req,res) => res.render('forgetPassword'));

// Register user Handler
router.post('/register', createUser)

// store expense handler
router.post('/expenses', createExpenses)

// Login Handle
router.post('/login', (req,res,next) => {
   passport.authenticate('local',{
     successRedirect:'/interface',
     failureRedirect:'/user/login',
     failureFlash:true
   })(req,res,next);
})

// update password Handler
router.put('/forgetPassword', forgetPasswordHandler)

// Logout Handle
router.get('/logout',(req,res) => {
   req.flash('success_msg','You are logged out');
   res.redirect('/user/login')
})

// get user expenses handle
router.get('/:id', (req,res) => {
   const userId = req.params._id;
   // console.log(req.userId.expenses);
   User.findById(userId,(err, result) => {
      if(err) throw err;
      console.log(result);
   })
})

module.exports = router;