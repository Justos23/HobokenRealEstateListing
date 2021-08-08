const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
//const session = require('express-session');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main'
})

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use('/private', async(req, res, next) =>{
  if (!req.session.user) {
    let errors = [];
    errors.push("You need to be logged In")
    return res.render('errors/errors',{
      title: 'Errors',
      errors: errors,
      partial: 'errors-script'});
  } 
  next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});