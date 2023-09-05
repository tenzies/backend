'use strict';

const express = require('express')
const UsersRouter = express.Router();
const {SignupHandler, LoginHandler, UpdateHandler, TimeRecordsHandler, UserDataHandler} = require('../handlers/user-handlers');

UsersRouter.post('/api/signup', SignupHandler);
UsersRouter.post('/api/login', LoginHandler);
UsersRouter.get('/api/user-data', UserDataHandler);
UsersRouter.put('/api/update', UpdateHandler);
UsersRouter.post('/api/time-records', TimeRecordsHandler);

module.exports = UsersRouter;