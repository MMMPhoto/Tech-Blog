import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import router from './controllers/index.js';
import sequelize from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: false,
  };
  
  app.use(session(sess));
  
  const hbs = exphbs.create({});
  
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