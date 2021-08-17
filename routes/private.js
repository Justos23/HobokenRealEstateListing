const express = require('express');
const router = express.Router();
const data = require('../data');
const UserData = data.users;
const PropertyData= data.properties;

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
    const sellType = (propertyInfo.sellType);
    const homeType = (propertyInfo.homeType);
    const price = (propertyInfo.price);
    const numofBedrooms = (propertyInfo.numofBedrooms);
    const numofBathrooms = (propertyInfo.numofBathrooms);
    const squareFeet = (propertyInfo.squareFeet);
    const streetname = (propertyInfo.streetname);

    errors = [];

    if (!sellType) errors.push('You need to state if the property is going to be either to sell or rent');
    if (!homeType) errors.push('You need to provide a valid home type');
    if (!price) errors.push('You need to provide a valid price');
    if (!numofBedrooms) errors.push('You need to provide the number of bedrooms');
    if (!numofBathrooms) errors.push('You need to provide the number of bathrooms');
    if (!squareFeet) errors.push('You need to provide a valid square feet');
    if (!streetname || typeof streetname !== 'string' || !streetname.trim() ) errors.push('You need to provide a valid street name');

    if (errors.length > 0) {
        return res.status(401).render('properties/new',{
            title: "Add a Property",
            property:propertyInfo,
            errors: errors
        });
    }

    try {
        const property = await PropertyData.CreateProperty(userData.username, sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, streetname);
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