const express = require('express');
const router = express.Router();
const data = require('../data');
const propertiesData = data.properties; 

router.get('/filters', async (req, res) =>{
    res.render('properties/filters', {
        title: "Search for Property",
    })
}),

router.get('/list', async (req, res) => {
    {
      const properties = await propertiesData.getAllProperties();
      res.render('properties/list', {properties: properties, title: "List of all Properties"}) 
  };
})

router.get('/single', async (req, res) => {
    {
      const properties = await propertiesData.getSingleProperty(req.params._id);
      res.render('properties/single', {properties: properties, title: properties.streetname}) 
  };
})

module.exports = router; 
