const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;


router.get('/login'), async (req, res) =>{
    res.render('users/login', {
        title: "Login Page",
        isLoggedIn: false, 
    })
}

router.post('/login'), async (req, res) =>{
    try{
        
        res.render('properties/list', {
                title: "Find a place",
                isLoggedIn: true, 
            })
    }catch(e){
    res.status(404).render('errors', {
      error : e,
      hasErrors: true,
      title: ""});
    }
    
}
module.exports = router;