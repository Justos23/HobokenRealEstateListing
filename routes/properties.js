const express = require('express');
const router = express.Router();
const data = require('../data');
const propertiesData = data.properties; 

router.get('/filters', async (req, res) =>{
    res.render('properties/filters', {
        title: "Search for Property",
    })
})



module.exports = router; 
