const usersRoutes = require('./users');
const propertiesRoutes = require('./properties');
const landingRoutes = require('./landing');

const constructorMethod = (app) => {

  app.get('/', (req, res) => {
    return res.render('landing/landing', {
        title: 'Home'
    });
  });

  app.use('/users', usersRoutes);
  app.use('/properties', propertiesRoutes);
  app.use('landing', landingRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Error 404: Page not found' });
  });
};

module.exports = constructorMethod;