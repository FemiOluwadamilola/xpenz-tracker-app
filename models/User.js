const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  income:{
    type:Number,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  expenses:[]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;