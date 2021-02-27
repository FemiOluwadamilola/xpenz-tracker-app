const express = require('express');
const router = express.Router();

// expense model
const Expense = require('../models/Expense.js');

router.post('/expenses', (req,res) => {
  const {expenseDetails,expenseAmount} = req.body;

  const newExpense = new Expense({
    expenseDetails,
    expenseAmount
  });

    newExpense.save() .then(expense => {
    req.flash('success_msg','New expense has been added!');
      res.redirect('/interface');
    }).catch(err => console.log(err))
})

// router.get('/expenses', async (req,res) => {
//   const result = await Expense.find()
//   const data = await res.result;
//   return {
//     data
//   }
// })

router.get('/expenses', (req,res) => {
  Expense.find({}, (err,result) => {
    if(err) throw err
    res.send(result);
  })
})

module.exports = router;