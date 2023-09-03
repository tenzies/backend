'use strict';
const Users = require('../model/users');
const bcrypt = require('bcrypt')

const SignupHandler = async (req, res) => {
  const {username, password} = req.body;
  const record = await Users.findOne({ username: username });
  if(!record) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await Users.create({ username: username, password: hashedPassword });
    res.json({ status: 201, msg: 'User created successfully' });
  }
  else {
    res.json({ status: 400, msg: 'User already exists' });
  }
}

const LoginHandler = async (req, res) => {
  const {username, password} = req.body;
  const record = await Users.findOne({ username: username });
  if(record) {
    const passwordCheck = await bcrypt.compare(password, record.password);
    if(passwordCheck) {
      res.json({ status: 200, msg: `Welcome ${username}`, body: {
        username: record.username,
        best_time: record.best_time
      } })
    }
    else {
      res.json({ status: 404, msg: 'Invalid Username/Password'})
    } 
  }
  else {
    res.json({ status: 404, msg: 'Invalid Username/Password'})
  }
}

const UpdateHandler = async (req, res) => {
  const { username, current_time } = req.body;
  const record = await Users.findOne({username});
  if( current_time < record.best_time || record.best_time === null) {
    await Users.updateOne({username: username}, {best_time: current_time});
    const updatedRecord = await Users.findOne({username: username}).select("username best_time");
    res.json({
      status: 204,
      msg: 'You achieved a new time record',
      body: {
        username: updatedRecord.username,
        best_time: updatedRecord.best_time
      }
    })
  } else {
    res.json({
      status: 400,
      msg: 'Current time record is higher than the best time record'
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
  UpdateHandler,
  TimeRecordsHandler
}