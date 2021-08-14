const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;
const users = mongoCollections.users;
//const users = require('./users');


const exportedMethods = {
  
  async ReadPropertyById(id) {
        if (!id) throw 'You need to provide an id'
        const propertyCollection = await properties();
        const property = await propertyCollection.findOne({ _id: ObjectId(id) });
    
        if (!property) throw 'Property not found';
        return property;
      },

    async CreateProperty(userID, sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, streetname) {

      if (!sellType) throw 'You need to state if the property is going to be either to sell or rent';
      if (!homeType) throw 'You need to provide a valid home type';
      if (!price) throw 'You need to provide a valid price';
      if (!numofBedrooms) throw 'You need to provide a valid number of bedrooms';
      if (!numofBathrooms) throw 'You need to provide a valid number of bathrooms';
      if (!squareFeet) throw 'You need to provide a valid square feet';
      if (!streetname || typeof streetname !== 'string' || !streetname.trim() ) throw 'You need to provide a valid location';

        const propertyCollection = await properties();
    
        const newProperty = {
            sellType:sellType,
            homeType: homeType,
            price: price,
            numofBedrooms: numofBedrooms,
            numofBathrooms: numofBathrooms,
            squareFeet: squareFeet,
            streetname: streetname,
            Seller: userID,
          }
        
    
        const newInsertInformation = await propertyCollection.insertOne(newProperty);
        const newId = newInsertInformation.insertedId;
    
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne({ username: userID},{$push: { 'Properties': newProperty }});
          if (updateInfo.modifiedCount === 0) {
              throw `Could not add property successfully`;
          }
        return await this.ReadPropertyById(newId);
      },
};


module.exports = exportedMethods;
