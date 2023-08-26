'use strict';
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const startServer = require('./src/server');

startServer(PORT, DATABASE_URL);