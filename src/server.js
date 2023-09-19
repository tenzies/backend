'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const UsersRouter = require('./routes/users-route');

server.use(cors({ origin: process.env.CLIENT_URL }));
server.use(express.json());
server.use(UsersRouter);

server.get('/', (req,res) => {
  res.send('Welcome to tenzies api server, created by Helmi Qatqat')
})

module.exports = server;
