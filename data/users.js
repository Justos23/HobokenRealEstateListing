const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comments;
const users = mongoCollections.users;
//const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const saltRounds = 16;
const commentsData = require('./comments');

const exportedMethods = {
    async ReadUserById(id) {
        if (!id) throw 'You need to provide an id'
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id) });
    
        if (!user) throw 'User not found';
        return user;
      },

      async getAllUsers(){
        const userCollection = await users();
        const allUsers = await userCollection.find({}).toArray();
        return allUsers;
    },


    async CreateUser(userFirstName, userLastName, username, email, tel, age,  password) {
        if (typeof userFirstName !== 'string') throw 'You need to provide a valid first name';
        if (typeof userLastName !== 'string') throw 'You need to provide a valid last name';
        if (typeof username !== 'string') throw 'You need to provide a valid username';
        if (typeof email !== 'string') throw 'You need to provide a valid email';
        if (typeof tel !== 'string') throw 'You need to provide a valid phone number';
        if (typeof age !== 'number') throw 'You need to provide a valid age';
        if (typeof password !== 'string') throw 'Invalid password';
        
        const allUsers = await this.getAllUsers();
        let email_lowerCase = email.toLowerCase();
        let username_lowerCase = username.toLowerCase();
        EMAILS=[];
        allUsers.forEach(user => EMAILS.push(user.email));
        USERNAME=[];
        allUsers.forEach(user => USERNAME.push(user.username));
        if(EMAILS.includes(email_lowerCase)) throw `This email already exists`;

        if(USERNAME.includes(username_lowerCase)) throw `This email already exists`;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const userCollection = await users();
    
        const newUser = {
          userFirstName:userFirstName, 
          userLastName: userLastName,
          username: username,
          hashedPassword: hashedPassword,
          email: email,
          phoneNumber: tel,
          age: age,
        };
    
        const newInsertInformation = await userCollection.insertOne(newUser);
        const newId = newInsertInformation.insertedId;
    
        return await this.ReadUserById(newId);
      },

      async addComment(userId,id) {
        let user = await this.ReadUserById(userId);
        const userDb = await users();
        const commentDb = await comments();
        const info = await userDb.updateOne(
          {_id: userId},
          {$addToSet: {comments: await commentsData.findOne({_id: id})}}
        )
        if (!info.matchedCount && !info.modifiedCount) {
          throw 'User comments update failed';
        }
        return await this.ReadUserById(userId);
      }
};

module.exports = exportedMethods;