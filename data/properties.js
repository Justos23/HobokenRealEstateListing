const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const propertiesData = mongoCollections.properties;
const properties = require('./properties');

const exportedMethods = {
  
  async ReadPropertyById(id) {
        if (!id) throw 'You need to provide an id'
        const propertyCollection = await properties();
        const property = await propertyCollection.findOne({ _id: ObjectId(id) });
    
        if (!property) throw 'Property not found';
        return property;
      },

    async CreateProperty(user, username, email, phone_number, propertyAttributes) {
        if (typeof user.userFirstName !== 'string') throw 'You need to provide a valid first name';
        if (typeof user.userLastName !== 'string') throw 'You need to provide a valid last name';
        if (typeof username !== 'string') throw 'You need to provide a valid username';
        if (typeof email !== 'string') throw 'You need to provide a valid email';
        if (typeof phone_number !== 'string') throw 'You need to provide a valid phone number';
        
    
    
        const userCollection = await users();
    
        const newUser = {
          user: { 
            userFirstName:user.userFirstName, 
            userLastName:user.userLastName
          },
          username: username,
          email: email,
          phone_number: phone_number,
          propertiesAttributes: {
            homeType: homeType,
            price: price,
            numofBedrooms: numofBedrooms,
            numofBathrooms: numofBathrooms,
            squareFT: squareFT,
            location: location
          }
        } 
    
        const newInsertInformation = await propertyCollection.insertOne(newProperty);
        const newId = newInsertInformation.insertedId;
    
        return await this.ReadPropertyById(newId);
      },
};


module.exports = exportedMethods;
