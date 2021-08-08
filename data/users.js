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

      async getAllUsers(){
        const userCollection = await users();
        const allUsers = await userCollection.find({}).toArray();
        for (let user of allUsers) {
            user._id = user._id.toString();
        }

        return allUsers;
    },


    async CreateUser(userFirstName, userLastName, username, email, tel, dob, age,  password) {
        if (typeof userFirstName !== 'string') throw 'You need to provide a valid first name';
        if (typeof userLastName !== 'string') throw 'You need to provide a valid last name';
        if (typeof username !== 'string') throw 'You need to provide a valid username';
        if (typeof email !== 'string') throw 'You need to provide a valid email';
        if (typeof tel !== 'string') throw 'You need to provide a valid phone number';
        if (typeof age !== 'number') throw 'You need to provide a valid age';
        if (typeof dob !== 'string') throw 'Invalid date of birth';
        if (typeof password !== 'string') throw 'Invalid password';
        
        const allUsers = await this.getAllUsers();
        let email_lowerCase = email.toLowerCase();
        let username_lowerCase = username.toLowerCase();
        allUsers.forEach(user => {
            if (user.email == email_lowerCase) throw 'This email is already taken.';
            if (user.username == username_lowerCase) throw 'This username is already taken.';
        })

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