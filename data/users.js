const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

const exportedMethods = {
    async ReadUserById(id) {
        if (!id) throw 'You need to provide an id'
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id) });
    
        if (!user) throw 'User not found';
        return user;
      },

    async CreateUser(user, username, email, phone_number, age, hashedpassword) {
        if (typeof user.userFirstName !== 'string') throw 'You need to provide a valid first name';
        if (typeof user.userLastName !== 'string') throw 'You need to provide a valid last name';
        if (typeof username !== 'string') throw 'You need to provide a valid username';
        if (typeof email !== 'string') throw 'You need to provide a valid email';
        if (typeof phone_number !== 'string') throw 'You need to provide a valid phone number';
        if (typeof age !== 'number') throw 'You need to provide a valid age';
        if (typeof hashedpassword !== 'string') throw 'Invalid password';
    
    
        const userCollection = await users();
    
        const newUser = {
          user: { 
            userFirstName:user.userFirstName, 
            userLastName:user.userLastName
          },
          username: username,
          email: email,
          phone_number: phone_number,
          age: age,
          hashedpassword: hashedpassword,
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