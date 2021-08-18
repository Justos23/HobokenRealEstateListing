const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;
const propertiesData = data.properties; 

router.get('/filters', async (req, res) =>{
    res.render('properties/filters', {
        title: "Search for Property",
    })
})

router.post('/list',async (req, res) => {
    const {sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, location} = req.body;
    const propertyDb = await properties();
    let filtered = propertyDb.find();
    if (sellType) {
        filtered = filtered.find({ $elemMatch : { sellType : sellType} })
    }
    if (homeType) {
        filtered = filtered.find({ $elemMatch : { homeType : homeType} })
    }
    if (price) {
        filtered = filtered.find({ $elemMatch : { price : price} })
    }
    if (numofBedrooms) {
        filtered = filtered.find({ $elemMatch : { numofBedrooms : numofBedrooms} })
    }
    if (numofBathrooms) {
        filtered = filtered.find({ $elemMatch : { numofBathrooms : numofBathrooms} })
    }
    if (squareFeet) {
        filtered = filtered.find({ $elemMatch : { squareFeet : squareFeet} })
    }
    if (location) {
        filtered = filtered.find({ $elemMatch : { location : location} })
    }
    res.render('/properties/list',{properties: filtered});
})

module.exports = router; 
