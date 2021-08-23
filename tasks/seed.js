const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const properties = data.properties;
const comments = data.comments;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const user1 = await users.CreateUser('John','Doe', "JOJO123", "jdoe@gmail.com", "2015463981", 28, "superstar2");
  const user2 = await users.CreateUser('Jane','Doe', "JaneDoe12", "jane.doe@gmail.com", "2015467457", 33, "MissJane");
  const user3 = await users.CreateUser('Tim', 'White', 'T1mWHT', "twhite@yahoo.com", "2014862357", 22, "Timmy_W");
  const user4 = await users.CreateUser('Juliette','Dupuy', "JuDupuy", "jdupuys@yahoo.com", "6045195684", 25, "182496");
  const user5 = await users.CreateUser('Emma','Green', "EMG_Star", "emma.green@hotmail.com", "1095643297", 18, "TheStar");
  const user6 = await users.CreateUser('Alice', 'Brown', 'Alice_Brown', "Ali.Brown@gmail.com", "4269731600", 43, "Great_Bear");
  

  const property1 = await properties.CreateProperty("JOJO123", "Greatest view of Court Street", "Rent", "Apartment", 2000, 2, 2, 1500, "Court Street", "Great location, near shops and restaurants, at affordable price!!!");
  const property2 = await properties.CreateProperty("JaneDoe12", "Beautiful Apt in Riverside", "Rent", "Apartment", 2500, 2, 1, 1000, "First Street", "Beautiful apartment bright with a terrace facing south and a parking space");
  const property3 = await properties.CreateProperty("T1mWHT", "Nicest House in Hoboken", "Sale", "House", 250000, 4, 3, 6000, "Washington Avenue", "With a backyard, this house has everything to offer");
  const property4 = await properties.CreateProperty("JuDupuy", "Charming Cozy Apartment", "Rent", "Apartment", 1975, 1, 1, 1000, "Fourth Street", "Only 10 minutes from New York City!!");
  const property5 = await properties.CreateProperty("JOJO123", "Newly renovated House", "Sale", "House", 500000, 4, 2, 10000, "Lincoln Avenue", "This is a nice peaceful home");
  const property6 = await properties.CreateProperty("Alice_Brown", "Bright and Spacious", "Rent", "Apartment", 2100, 2, 2, 2600, "Third Street", "Located next to Washington Park");
  const property7 = await properties.CreateProperty("EMG_Star", "Tranquility large 4 bedrooms on cul-de-sac", "Sale", "House", 1000000, 4, 2, 10000, "Oak Alley", "Luxurious fully equiped, with big backyard and a pool and tennis court");
  
  
  console.log('Done seeding database');

  //await db.serverConfig.close();
}

main();