const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const properties = data.properties;
const comments = data.comments;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const user1 = await users.CreateUser('John','Doe', "JOJO123", "jdoe@gmail.com", "2015463981", 28, "sd5a1d5w8ad52c1456DXS4");
  const user2 = await users.CreateUser('Jane','Doe', "JaneDoe12", "jane.doe@gmail.com", "2015467457", 33, "sd5a1d5w8d541a4s58");
  //const user3 = await users.CreateUser({ "userFirstName": 'Tim',  "userLastName": 'White'}, "T1mWHT", "twhite@yahoo.com", "2014862357", 22, "a6fas1as1a47E8R7Esf1");
  //const user4 = await users.CreateUser({ "userFirstName": 'Alice',  "userLastName": 'Brown'}, "Alice_Brown", "Ali.Brown@gmail.com", "2015456321", 25, "asd45f1f7ggh8jd7sx4");
  //const user5 = await users.CreateUser({ "userFirstName": 'Bob',  "userLastName": 'Green'}, "Bobby", "greenbobby@gmail.com", "2017969430", 30, "s8v1j4i2f1sz541s4x1c4");

  const property1 = await properties.CreateProperty("610959893e49842908a03f83", "Rent", "apartment", "$2,500/month", 2, 1, 900, "219 Court Street");
  //const review2 = await properties.CreateProperty("This is good", "Justin Depardieu", 4, "15/65/1849", "I liked it");
  //const review3 = await properties.CreateProperty("This is ok", "Justin Depardieu", 3, "15/65/1849", "I seen it");
  //const review4 = await properties.CreateProperty("This is great not great", "Justin Depardieu", 2, "15/65/1849", "I did not enjoy it");

  const comment1 = await comments.CreateComment("610959893e49842908a03f83", "61095a80f0131e26dce97025", "The views this property offers are great!")
  
  console.log('Done seeding database');

  //await db.serverConfig.close();
}

main();