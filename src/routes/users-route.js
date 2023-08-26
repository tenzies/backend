'use strict';

const express = require('express')
const UsersRouter = express.Router();
const {SignupHandler, LoginHandler, UpdateHandler} = require('../handlers/user-handlers');

UsersRouter.post('/api/signup', SignupHandler);
UsersRouter.post('/api/login', LoginHandler);
UsersRouter.put('/api/update', UpdateHandler);

module.exports = UsersRouter;