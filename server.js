// Enable Require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// General Imports
import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import helpers from './utils/helpers.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define SequilizeStore with session.store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up Sequelize
import router from './controllers/index.js';
import sequelize from './config/connection.js';

// Set up express and set port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // maxAge: 3600,
        // secure: false,
        // httpOnly: true,
        // sameSite: "strict"
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// Set up handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
  
// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
  
app.use(router);
  
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});