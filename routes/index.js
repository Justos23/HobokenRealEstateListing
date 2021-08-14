const userRoutes = require('./users');
const propertiesRoutes = require('./properties');
const landingRoutes = require('./landing');
const privateRoutes = require('./private');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(request, file, callback){
    callback(null, './public/Properties');
  },

  filename:function(request, file, callback){
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage:storage,
  limits:{
    fieldsize:1024*1024*3
  },
});

const constructorMethod = (app) => {

  app.get('/', (req, res) => {
    return res.render('landing/landing', {
        title: 'Home'
    });
  });

  app.use('/users', userRoutes);
  app.use('/properties', propertiesRoutes);
  app.use('/landing', landingRoutes);
  app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Error 404: Page not found' });
  });
};

module.exports = constructorMethod;