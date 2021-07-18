const usersRoutes = require('./users');
const propertiesRoutes = require('./properties');

const constructorMethod = (app) => {
  app.use('/users', usersRoutes);
  app.use('/properties', propertiesRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Error 404: Page not found' });
  });
};

module.exports = constructorMethod;