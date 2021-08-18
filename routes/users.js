const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');
const saltRounds = 16;
//const verifier = require('../data/verify');
//const xss = require('xss')
const userData = data.users;


router.get('/login', async (req, res) =>{
    if (req.session.user){
        res.redirect('/private/profile')
    }else{
        res.render('users/login', {
            title: "Login Page",
        })
    }
}) 

router.post('/login', async (req, res) =>{
    let userInfo = req.body;
    const username_lowerCase = (userInfo.username.trim()).toLowerCase();
    const password = (userInfo.password.trim());

    let CurrentUser;

    errors = [];

    const users = await userData.getAllUsers();
    for (let i = 0; i < users.length; i++){
        if (users[i].username.toLowerCase() == username_lowerCase){
            CurrentUser = users[i];
        }
    }

    if (!CurrentUser) errors.push("Username or password does not match.");

    if (errors.length > 0) {
        return res.status(401).render('users/login',{
            title: "Log In",
            errors: errors
        });
    }

    let match = await bcrypt.compare(password, CurrentUser.hashedPassword);

    if (match){
        req.session.user = CurrentUser;
        let temp = req.session.previousRoute;
        if (temp) {
            req.session.previousRoute = '';
            return res.redirect(temp);
        } 
        res.redirect('/');
    } else {
        errors.push("Username or password does not match");
        return res.status(401).render('users/login', {   
            title: "Log In",
            errors: errors
        });
    }
});

router.get('/signup', async (req, res) => {
    res.render('users/signup', {
            title: 'Sign Up',
    })
});

router.post('/signup', async (req, res) => {
    let userInfo = req.body;
    const userFirstName = (userInfo.userFirstName);
    const userLastName = (userInfo.userLastName);
    const username = (userInfo.username);
    const password = (userInfo.password);
    const password_confirm = (userInfo.password_confirm);
    const email = (userInfo.email);
    const tel = (userInfo.tel);
    let age = parseInt((userInfo.age));

    errors = [];

    if (!userFirstName || typeof userFirstName !== 'string' || !userFirstName.trim()) errors.push('You need to provide a valid first name');
    if (!userLastName || typeof userLastName !== 'string' || !userLastName.trim()) errors.push('You need to provide a valid last name');
    if (!username || typeof username !== 'string' || !username.trim()) errors.push('You need to provide a valid username');
    if (!email || typeof email !== 'string' || !email.trim()) errors.push('You need to provide a valid email');
    if (!tel || typeof tel !== 'string' || !tel.trim()) errors.push('You need to provide a valid phone number');
    if (!age || typeof parseInt(age) !== 'number' || age < 1 || age > 160) errors.push('You need to provide a valid age');
    if (!password || typeof password !== 'string' || !password.trim()) errors.push('Invalid password');
    if(password !== password_confirm ) errors.push('Passwords do not match');

    if (errors.length > 0) {
        return res.status(401).render('users/signup',{
            title: "Sign Up",
            user:userInfo,
            authenticated: false,
            errors: errors
        });
    }

    try {
        const user = await userData.CreateUser(userFirstName, userLastName, username, email, tel, age,  password);
        req.session.user = user;
        res.redirect("/");
    } catch(e) {
        errors.push(e);
        return res.status(401).render('users/signup',{
            title: "Sign Up",
            user:userInfo,
            authenticated: false,
            errors: errors
        });
    }
});

router.get('/logout', async(req,res) =>{
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;