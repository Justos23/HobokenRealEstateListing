const userRoutes = require('./users');
const propertiesRoutes = require('./properties');
const landingRoutes = require('./landing');
const privateRoutes = require('./private');
const mongoCollections = require('../config/mongoCollections');
const properties = mongoCollections.properties;

const constructorMethod = (app) => {

  app.use('/users', userRoutes);
  app.use('/properties', propertiesRoutes);
  app.use('/private', privateRoutes);

  app.get('/', async (req, res) => {
    const propertyDb = await properties();
    let listings = await propertyDb.aggregate(
        [ { $sample: { size: 3 } } ]
    ).toArray();
    console.log(listings);
    return res.render('landing/landing', {
        title: 'Home',
        properties: listings
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Error 404: Page not found' });
  });
};

module.exports = constructorMethod;