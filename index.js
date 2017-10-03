const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// const session = require('express-session');
require('./models/Contact');
require('./models/User');
require('./models/Company');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(morgan('combined'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes/authRoutes')(app);
require('./routes/contactRoutes')(app);
require('./routes/companiesRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
