'use strict';
require('dotenv').config();
const Users = require('../model/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SignupHandler = async (req, res) => {
  const encodedData = req.headers.authorization.split(" ")[1];
  const [username, password] = atob(encodedData).split(":");
  const result = await Users.findOne({ username: username });
  if(!result) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await Users.create({ username: username, password: hashedPassword });
    res.json({ status: 201, msg: 'User created successfully' });
  }
  else {
    res.json({ status: 400, msg: 'User already exists' });
  }
}

const LoginHandler = async (req, res) => {
  const encodedData = req.headers.authorization.split(" ")[1];
  const [username, password] = atob(encodedData).split(":");
  const result = await Users.findOne({ username: username });
  if(result) {
    const record = result.toObject()
    const validPassword = await bcrypt.compare(password, record.password);
    if(validPassword) {
      delete record.password
      const token = jwt.sign(record, process.env.TOKEN_SECRET)
      res.json({ status: 200, msg: `Welcome ${username}`, token: token })
    }
    else {
      res.json({ status: 404, msg: 'Invalid Username/Password'})
    } 
  }
  else {
    res.json({ status: 404, msg: 'Invalid Username/Password'})
  }
}

const UserDataHandler = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const validToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if(validToken) {
    const userData = jwt.decode(token);
    res.json(userData);
  } else {
    res.json({
      status: 403,
      msg: 'Invalid access token'
    })
  }
}

const UpdateHandler = async (req, res) => {
  const { current_time } = req.body
  const token = req.headers.authorization.split(" ")[1];
  const validToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if(validToken) {
    const { username } = jwt.decode(token);
    const record = await Users.findOne({username});
    if( current_time < record.best_time) {
      await Users.updateOne({username: username}, {best_time: current_time});
      const updatedResult = await Users.findOne({ username: username });
      const updatedRecord = updatedResult.toObject();
      const updatedToken = jwt.sign(updatedRecord, process.env.TOKEN_SECRET);
      res.json({
        status: 204,
        msg: 'You achieved a new time record',
        token: updatedToken
      })
    } else {
      res.json({
        status: 400,
        msg: 'Current time record is higher than the best time record'
      })
    }
  }
  else {
    res.json({
      status: 403,
      msg: 'Invalid access token'
    })
  } 
}

const TimeRecordsHandler = async (req, res) => {
  const { limit, offset } = req.body;
  try {
    const record = await Users.find()
    .select("username best_time")
    .sort({best_time: 1}) 
    .limit(limit)
    .skip(offset)
    res.json(record);
  } catch(e) {
    console.log(e)
  }
}

module.exports = {
  SignupHandler,
  LoginHandler,
  UserDataHandler,
  UpdateHandler,
  TimeRecordsHandler
}