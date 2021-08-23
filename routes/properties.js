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
const xss = require('xss');

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
        filtered = filtered.filter(x => parseInt(x.price) <= parseInt(price));
    }
    if (numofBedrooms) {
        filtered = filtered.filter(x => parseInt(x.numofBedrooms) >= parseInt(numofBedrooms));
    }
    if (numofBathrooms) {
        filtered = filtered.filter(x => parseInt(x.numofBathrooms) >= parseInt(numofBathrooms));
    }
    if (squareFeet) {
        filtered = filtered.filter(x => parseInt(x.squareFeet) >= parseInt(squareFeet));
    }
    if (location) {
        filtered = filtered.filter(x => x.streetname == location);
    }
    return res.render('properties/list',{properties: filtered});
})

router.get('/:_id', async (req, res) => {
    {
      const property = await propertiesData.ReadPropertyById(req.params._id);
      const seller = await usersData.ReadUserByUsername(property.Seller);
      if(req.session.user){
        var isSeller = (property.Seller == req.session.user.username) ? true :false;    
      }else{
          isSeller = false;
      }
        
      res.render('properties/single', {property: property, seller: seller, title: property.title, comments: property.comments, isSeller : isSeller}) 
  };
})


router.post('/:_id', async (req, res) => {
    if (req.session.user) {
        const comment = (xss(req.body.comment));
        userId = req.session.user._id;
        user = await usersData.ReadUserById(req.session.user._id)
        username = user.username;
        const commentInfo = await commentsData.CreateComment(userId,req.params._id,comment, username);
        return res.redirect(`/properties/${req.params._id}`)
    } else {
        return res.status(401).redirect('../users/login');
    }
})

module.exports = router; 
