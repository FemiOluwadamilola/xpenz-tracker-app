const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  expenseDetails:{
    type:String,
    require:true
  },
  expenseAmount:{
    type:Number,
    require:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;