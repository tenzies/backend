'use strict';
require('dotenv').config();
const server = require('./src/server');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database')
    server.listen(process.env.PORT, () => {
      console.log(`Server is connected and listening on port ${process.env.PORT}`)
    })
  })
  .catch((e) => {
    console.log('Connection to Database Failed');
    console.log(`Error: ${e.message}`)
  });
