const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const properties = require('./properties');

const exportedMethods = {
    async ReadUserById(id) {
        if (!id) throw 'You need to provide an id'
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id) });
    
        if (!user) throw 'User not found';
        return user;
      },

    async CreateUser(userFirstName, userLastName, username, hashedPassword, email, phoneNumber, age) {
        if (typeof userFirstName !== 'string') throw 'You need to provide a valid first name';
        if (typeof userLastName !== 'string') throw 'You need to provide a valid last name';
        if (typeof username !== 'string') throw 'You need to provide a valid username';
        if (typeof email !== 'string') throw 'You need to provide a valid email';
        if (typeof phoneNumber !== 'string') throw 'You need to provide a valid phone number';
        if (typeof age !== 'number') throw 'You need to provide a valid age';
        if (typeof hashedPassword !== 'string') throw 'Invalid password';
    
    
        const userCollection = await users();
    
        const newUser = {
          userFirstName:userFirstName, 
          userLastName: userLastName,
          username: username,
          hashedPassword: hashedPassword,
          email: email,
          phoneNumber: phoneNumber,
          age: age,
          properties: [],
          favorites: [],
          comments: [],
        };
    
        const newInsertInformation = await userCollection.insertOne(newUser);
        const newId = newInsertInformation.insertedId;
    
        return await this.ReadUserById(newId);
      },
};

module.exports = exportedMethods;