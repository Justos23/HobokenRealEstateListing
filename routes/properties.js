const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const mongoCollections = require('../config/mongoCollections');
const { comments } = require('../config/mongoCollections');
const properties = mongoCollections.properties;
const propertiesData = data.properties;
const commentsData = data.comments;
const usersData = data.users;

router.get('/filters', async (req, res) =>{
    res.render('properties/filters', {
        title: "Search for Property",
    })
})

router.post('/list',async (req, res) => {
    const {sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, location} = req.body;
    const propertyDb = await properties();
    let filtered = await propertyDb.find({}).toArray();
    if (sellType) {
        filtered = filtered.filter(x => x.sellType == sellType);
    }
    if (homeType) {
        filtered = filtered.filter(x => x.homeType == homeType);
    }
    if (price) {
        filtered = filtered.filter(x => x.price < price);
    }
    if (numofBedrooms) {
        filtered = filtered.filter(x => x.numofBedrooms > numofBedrooms);
    }
    if (numofBathrooms) {
        filtered = filtered.filter(x => x.numofBathrooms > numofBathrooms);
    }
    if (squareFeet) {
        filtered = filtered.filter(x => x.squareFeet > squareFeet);
    }
    if (location) {
        filtered = filtered.filter(x => x.streetname == location);
    }
    return res.render('properties/list',{properties: filtered});
})

router.get('/:_id', async (req, res) => {
    {
      const property = await propertiesData.ReadPropertyById(req.params._id);
      res.render('properties/single', {property: property, title: property.streetname, comments: property.comments}) 
  };
})

router.post('/:_id', async (req, res) => {
    if (req.session.user) {
        const {comment} = req.body;
        userId = req.session.user._id;
        user = await usersData.ReadUserById(req.session.user._id)
        username = user.username;
        const commentInfo = await commentsData.CreateComment(userId,req.params._id,comment, username);
        return res.redirect(`/properties/${req.params._id}`)
    } else {
        return res.status(401).redirect('../users/signup');
    }
})

module.exports = router; 
