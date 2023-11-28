const express = require('express');
const exphbs = require('express-handlebars');
//TO DO: when helpers add this in here
const hbs = exphbs.create({});
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

//This controls how long someone can be logged in for
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUnlisted: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session(sess));

//handles all handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });  