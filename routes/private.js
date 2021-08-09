const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.users;


router.get('/addProperty', async (req, res) =>{
    const userData = req.session.user;
    res.render('Properties/new', {
        title: "Add a Property",
        userData: userData, 
        })
})

router.get('/profile', async (req, res) =>{
    if(req.session.user){
        const CurrentUser = req.session.user;
        res.render('users/profile', {
        title: "Profile",
        user: CurrentUser,
        })
    }else{
        res.redirect("/");
    }
})


module.exports = router;