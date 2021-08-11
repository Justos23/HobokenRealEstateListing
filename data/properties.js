const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;
const comments = mongoCollections.comments;
const users = require('./users');
const commentsData = require('./comments');

const exportedMethods = {
  
  async ReadPropertyById(id) {
        if (!id) throw 'You need to provide an id'
        const propertyCollection = await properties();
        const property = await propertyCollection.findOne({ _id: ObjectId(id) });
    
        if (!property) throw 'Property not found';
        return property;
      },

    async CreateProperty(userID, sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, address) {

        if (typeof userID !== 'string') throw 'You need to provide a valid userID';
        if (typeof sellType !== 'string') throw 'You need to state if the property is going to be either to sell or rent';
        if (typeof homeType !== 'string') throw 'You need to provide a valid home type';
        if (typeof price !== 'string') throw 'You need to provide a valid price';
        if (typeof numofBedrooms !== 'number') throw 'You need to provide a valid number of bedrooms';
        if (typeof numofBathrooms !== 'number') throw 'You need to provide a valid number of bathrooms';
        if (typeof squareFeet !== 'number') throw 'You need to provide a valid square feet';
        if (typeof address !== 'string') throw 'You need to provide a valid location';

        const propertyCollection = await properties();
    
        const newProperty = {
            userID: userID,
            sellType:sellType,
            homeType: homeType,
            price: price,
            numofBedrooms: numofBedrooms,
            numofBathrooms: numofBathrooms,
            squareFeet: squareFeet,
            address: address,
            pictures: [],
            comments: [],
          }
        
    
        const newInsertInformation = await propertyCollection.insertOne(newProperty);
        const newId = newInsertInformation.insertedId;
    
        return await this.ReadPropertyById(newId);
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
