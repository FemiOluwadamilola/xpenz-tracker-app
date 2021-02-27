const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

router.get('/',(req,res) => res.render('home'));

router.get('/interface', ensureAuthenticated, (req,res)=> res.render('interface',{
  user:req.user
}));


module.exports = router;