const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.users;


router.get('/'), async (req, res) =>{
    res.render('landing/landing', {
        title: "HoReEsLi",
        isLoggedIn: false, 
    })
}


module.exports = router;