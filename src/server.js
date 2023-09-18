'use strict';
require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const UsersRouter = require('./routes/users-route');

server.use(cors({ origin: process.env.CLIENT_URL }));
server.use(express.json());
server.use(UsersRouter);

module.exports = server;
