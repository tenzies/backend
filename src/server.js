'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UsersRouter = require('./routes/users-route');

server.use(cors({ origin: process.env.CLIENT_URL }));
server.use(express.json());
server.use(UsersRouter);

const startServer = (PORT, DATABASE_URL) => {
  mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database')
    server.listen(PORT, () => {
      console.log(`Server is connected and listening on port ${PORT}`)
    })
  })
  .catch((e) => {
    console.log('Connection to Database Failed');
    console.log(`Error: ${e.message}`)
  });
}

module.exports = startServer;
