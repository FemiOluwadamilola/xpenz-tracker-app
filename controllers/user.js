const bcrypt = require('bcryptjs');


// User model
const User = require('../models/User.js');

const createUser = (req,res) => {
  const {name,email,income,password,password2}  = req.body;
  let errors = [];

  // check required fields
  if(!name || !email || !income || !password || !password2){
     errors.push({msg:'Please fill in all fields'})
  }

  // check matched passwords
  if(password !== password2){
    errors.push({msg:'Passwords do not match'});
  }
  
  // check password length
  if(password.length < 6){
    errors.push({msg:'password should be at least 6 characters'})
  }

  if(errors.length > 0){
     res.render('register', {
       errors,
       name,
       email,
       income,
       password,
       password2
     })
  }else{
    // validation passed
    User.findOne({email:email})
    .then(user => {
      if(user){
        // User exists 
        errors.push({msg:'Email is already registered'})
        res.render('register', {
          errors,
          name,
          email,
          income,
          password,
          password2
        })
      }else{
        const newUser = new User({
          name,
          email,
          income,
          password
        });
        // hash password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          // set password to hashed
          newUser.password = hash;

          newUser.save()
          .then(user => {
            req.flash('success_msg','You are now registered and can log in');
             res.redirect('/user/login');
          })
          .catch(err => console.log(err))
        }))
      }
    })
  }
}

const createExpenses =  (req,res) => {
  const userProfileId = req.user._id; 
  const { expenseDetails, expenseAmount} = req.body;
  const expenseInfo = {
     expenseDetails,
     expenseAmount
  };
  User.findOneAndUpdate(
    {_id:userProfileId},
    {$push:{expenses:expenseInfo}},
     function(error,success){
       if(error){
         console.log(error)
       }else{
         console.log(success)
         res.redirect('/interface')
       }
     }
    )
}


const forgetPassword = (req,res) => {
  const {email, new_password, confirm_new_password} = req.body;
  const errors = [];

 if(new_password !== confirm_new_password){
    errors.push({msg:'Passwords do not match'});
 }

 User.findOne({email:email})
 .then(user => {
   if(!user){
    errors.push({msg:'Email does not exist'})
    res.redirect('/user/register');
   }else{
    const userNewPassword = new User({
      password:new_password
    });
     // hash password
     bcrypt.genSalt(10, (err, salt) => bcrypt.hash(userNewPassword.password, salt, (err, hash) => {
      if(err) throw err;

      // set new password to hashed
      userNewPassword.password = hash;

        userNewPassword.updateOne({email:email},{
          $set:{
            password:new_password
          }
       })
        req.flash('success_msg','password updated successfully ');
        res.redirect('/user/login');
    }))
   }
 })
}



module.exports = {createUser, createExpenses,forgetPassword}