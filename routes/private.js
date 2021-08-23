const express = require('express');
const router = express.Router();
const data = require('../data');
const UserData = data.users;
const PropertyData= data.properties;
const xss = require('xss');

router.get('/addProperty',  async (req, res) =>{
    const userData = req.session.user;
    res.render('properties/new', {
        title: "Add a Property",
        userData: userData,
        
        })
})

router.post('/addProperty', async (req, res) =>{
    const userData = req.session.user;
    let propertyInfo = req.body;
    const title = xss(propertyInfo.title);
    const sellType = xss(propertyInfo.sellType);
    const homeType = xss(propertyInfo.homeType);
    const price = xss(propertyInfo.price);
    const numofBedrooms = xss(propertyInfo.numofBedrooms);
    const numofBathrooms = xss(propertyInfo.numofBathrooms);
    const squareFeet = xss(propertyInfo.squareFeet);
    const streetname = xss(propertyInfo.streetname);
    const bio = xss(propertyInfo.bio);

    errors = [];

    if (!title) errors.push('You need to provide a title for your property');
    if (!sellType) errors.push('You need to state if the property is going to be either to sell or rent');
    if (!homeType) errors.push('You need to provide a valid home type');
    if (!price) errors.push('You need to provide a valid price');
    if (!numofBedrooms) errors.push('You need to provide the number of bedrooms');
    if (!numofBathrooms) errors.push('You need to provide the number of bathrooms');
    if (!squareFeet) errors.push('You need to provide a valid square feet');
    if (!streetname || typeof streetname !== 'string' || !streetname.trim() ) errors.push('You need to provide a valid street name');
    if (!bio) errors.push('You need to provide a bio for your property');

    if (errors.length > 0) {
        return res.status(401).render('properties/new',{
            title: "Add a Property",
            property:propertyInfo,
            errors: errors
        });
    }

    try {
        const property = await PropertyData.CreateProperty(userData.username, title, sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, streetname, bio);
        console.log("Property successfully added");
        req.session.user= CurrentUser;
        res.redirect("/");
    } catch(e) {
        errors.push(e);
        return res.status(401).render('properties/new',{
            title: "Add a Property",
            property:propertyInfo,
            errors: errors
        });
    }
});

router.get('/addFavorites/:_id', async (req, res) =>{
  if(!req.session.user){
    console.log("You need to be logged in to add to favorites");
    return;
  }
  try {
    await PropertyData.addFavorites(req.params._id, req.session.user.username);
    console.log("Property added to favorites successfully!");
    req.session.user= CurrentUser;
    res.redirect("/");
  } catch (e) {
    res.status(500).json({ error: 'Property could not be deleted' });
  }
});


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


router.delete('/removeproperty/:_id', async (req, res) => {
    if (!req.params._id) {
      res.status(400).json({ error: 'You must Supply an ID to delete' });
      return;
    }
    try {
      await PropertyData.remove(req.params._id, req.session.user.username);
      console.log("Property removed successfully!");
      req.session.user= CurrentUser;
      res.redirect("/");
    } catch (e) {
      res.status(500).json({ error: 'Property could not be deleted' });
    }
  });



router.delete('/propertysold/:_id', async (req, res) => {
    
    if (!req.params._id) {
        res.status(400).json({ error: 'You must Supply an ID to complete sell' });
        return;
      }
      try {
        await PropertyData.sold(req.params._id, req.session.user.username);
      console.log("Property sold successfully!");
      req.session.user= CurrentUser;
      res.redirect("/");
      } catch (e) {
        res.status(500).json({ error: 'Property could not be sold' });
      }
})


module.exports = router;