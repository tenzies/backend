'use strict';

const express = require('express')
const UsersRouter = express.Router();
const {SignupHandler, LoginHandler, UpdateHandler, TimeRecordsHandler} = require('../handlers/user-handlers');

UsersRouter.post('/api/signup', SignupHandler);
UsersRouter.post('/api/login', LoginHandler);
UsersRouter.put('/api/update', UpdateHandler);
UsersRouter.post('/api/time-records', TimeRecordsHandler);

module.exports = UsersRouter;