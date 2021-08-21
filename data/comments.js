const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comments;
const users = require('./users');
const properties = require('./properties');

const exportedMethods = {
  
  async ReadCommentById(id) {
        if (!id) throw 'You need to provide an id'
        const commentCollection = await comments();
        const comment = await commentCollection.findOne({ _id: ObjectId(id) });
    
        if (!comment) throw 'Comment not found';
        return comment;
  },
    
   async CreateComment(userID, propertyID, comment, username) {

        if (typeof userID !== 'string') throw 'You need to provide a valid user ID';
        if (typeof propertyID !== 'string') throw 'You need to provide a valid property ID';
        if (typeof comment !== 'string') throw 'You need to provide a valid comment';
           
    
        const commentCollection = await comments();
        
        const newComment = {
            userID: userID,
            propertyID: propertyID,
            comment: comment,
            username: username
        }
            
        const newInsertInformation = await commentCollection.insertOne(newComment);
        const newId = newInsertInformation.insertedId;

        const property = await properties.addComment(propertyID,newId);
        const user = await users.addComment(userID,newId);
        
        return await this.ReadCommentById(newId);
    },
  };
    
  module.exports = exportedMethods;
    