const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.users;
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;

router.get('/'), async (req, res) =>{
    const propertyDb = await properties();
    let listings = await propertyDb.aggregate(
        [ { $sample: { size: 3 } } ]
    ).toArray();
    console.log(listings);
    res.render('landing/landing', {
        title: "HoReEsLi",
        isLoggedIn: false, 
        properties: listings
    })
};


module.exports = router;