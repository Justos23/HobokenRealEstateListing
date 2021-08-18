const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;
const comments = mongoCollections.comments;
const commentsData = require('./comments');
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
            //address: address,
            //pictures: [],
            //comments: [],
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
        CurrentUser = await userCollection.findOne({ username: userID});
        return CurrentUser;
        //return await this.ReadPropertyById(newId);
      },

    async addComment(propertyId,id) {
      let property = await this.ReadPropertyById(propertyId);
      const propertyDb = await properties();
      const commentDb = await comments();
      const info = await propertyDb.updateOne(
        {_id: propertyId},
        {$addToSet: {comments: await commentsData.findOne({_id: id})}}
      )
      if (!info.matchedCount && !info.modifiedCount) {
        throw 'Property comments update failed';
      }
      return await this.ReadPropertyById(propertyId);
    }
};


module.exports = exportedMethods;
