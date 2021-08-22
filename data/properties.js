const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;
const comments = mongoCollections.comments;
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

      async CreateProperty(userID, title, sellType, homeType, price, numofBedrooms, numofBathrooms, squareFeet, streetname, bio) {

        if (!title) errors.push('You need to provide a title for your property');
        if (!sellType) throw 'You need to state if the property is going to be either to sell or rent';
        if (!homeType) throw 'You need to provide a valid home type';
        if (!price) throw 'You need to provide a valid price';
        if (!numofBedrooms) throw 'You need to provide a valid number of bedrooms';
        if (!numofBathrooms) throw 'You need to provide a valid number of bathrooms';
        if (!squareFeet) throw 'You need to provide a valid square feet';
        if (!streetname || typeof streetname !== 'string' || !streetname.trim() ) throw 'You need to provide a valid location';
        if (!bio) errors.push('You need to provide a bio for your property');
  
          const propertyCollection = await properties();
      
          const newProperty = {
              title:title,
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
              bio:bio,
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

    async sold(id, seller_username){
      if (!id) throw 'You need to provide an id';
      const propertyCollection = await properties();
      try {
        property = await this.ReadPropertyById(id);
      } catch (e) {
        console.log(e);
      }
      const deletionInfo = await propertyCollection.deleteOne({ _id: ObjectId(id) });
      if (deletionInfo.deletedCount === 0) {
        throw `Could not add property as sold`;
      }
        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
        { "Properties._id": ObjectId(id) },
        { $pull: { Properties: { _id: ObjectId(id) } } }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw 'Update failed';
        CurrentUser = await userCollection.findOne({ username: seller_username});
        return CurrentUser;
      },


    async remove(id, seller_username){
      if (!id) throw 'You need to provide an id';
      const propertyCollection = await properties();
      try {
        property = await this.ReadPropertyById(id);
      } catch (e) {
        console.log(e);
      }
      const deletionInfo = await propertyCollection.deleteOne({ _id: ObjectId(id) });
      if (deletionInfo.deletedCount === 0) {
        throw `Could not add property as sold`;
      }

      const userCollection = await users();
      const updateInfo = await userCollection.updateOne(
      { "Properties._id": ObjectId(id) },
      { $pull: { Properties: { _id: ObjectId(id) } } }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw 'Update failed';
      CurrentUser = await userCollection.findOne({ username: seller_username});
      return CurrentUser;
    },



    async addComment(propertyId,id) {
      const propertyDb = await properties();
      const commentDb = await comments();
      const comment = await commentDb.findOne({ _id: ObjectId(id) })
      const info = await propertyDb.updateOne(
        {_id: ObjectId(propertyId)},
        {$addToSet: {comments: comment}}
      )
      if (!info.matchedCount && !info.modifiedCount) {
        throw 'Property comments update failed';
      }
      return await this.ReadPropertyById(propertyId);
    },
    
};


module.exports = exportedMethods;
