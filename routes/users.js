const express = require('express');
const router = express.Router();
const data = require('../data');
//const bcrypt = require('bcrypt');
//const verifier = require('../data/verify');
//const xss = require('xss')
const userData = data.users;


router.get('/login', async (req, res) =>{
    res.render('users/login', {
        title: "Login Page",
    })
})

router.post('/login', async (req, res) =>{
    res.redirect("/")
})

router.get('/signup', async (req, res) => {
    res.render('users/signup', {
            title: 'Sign Up',
    })
})

router.post('/signup', async (req, res) => {
    let userInfo = req.body;
    const userFirstName = (req.body.firstName);
    const userLastName = (req.body.lastName);
    const username = (req.body.username);
    const password = (req.body.password);
    const password_confirm = (req.body.password_confirm);
    const email = (req.body.email);
    const tel = (req.body.tel);
    const dob = (req.body.dob);
    let age = parseInt((req.body.age));

    errors = [];

    if (!userFirstName || typeof userFirstName !== 'string' || !userFirstName.trim()) errors.push('You need to provide a valid first name');
    if (!userLastName || typeof userLastName !== 'string' || !userLastName.trim()) errors.push('You need to provide a valid last name');
    if (!username || typeof username !== 'string' || !username.trim()) errors.push('You need to provide a valid username');
    if (!email || typeof email !== 'string' || !email.trim()) errors.push('You need to provide a valid email');
    if (!tel || typeof tel !== 'string' || !tel.trim()) errors.push('You need to provide a valid phone number');
    if (!tel || typeof tel !== 'number' || !tel.trim()) errors.push('You need to provide a valid age');
    if (!dob || typeof dob !== 'string' || !dob.trim()) errors.push('Invalid date of birth');
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
        const user = await userData.createUser(userFirstName, userLastName, username, email, tel, dob, age,  password);
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

module.exports = router;