'use strict';
const express = require('express');
const server = express();
const cors = require('./middleware/cors');

server.use(express.json());
server.use(cors());
