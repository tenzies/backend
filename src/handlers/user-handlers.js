'use strict';
const Users = require('../model/users');
const bycrpt = require('bcrypt')

const SignupHandler = async (req, res) => {
  const {username, password} = req.body;
  const record = await Users.findOne({ username: username });
  if(!record) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await Users.create({ username: username, password: hashedPassword });
    res.json({ status: 201, msg: 'User created successfully' });
  }
  else {
    res.json({ status: 200, msg: 'User already exists' });
  }
}

const LoginHandler = async (req, res) => {
  const {username, password} = req.body;
  const record = await Users.findOne({ username: username });
  if(record) {
    const passwordCheck = await bcrypt.compare(password, record.password);
    if(passwordCheck) {
      delete record.password
      res.json({ status: 200, payload: record })
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
  const { username, best_time } = req.body;
  await Users.findOneAndReplace({username}, {best_time: best_time});
  res.json({
    status: 200,
    msg: 'You have achieved a new time record'
  })
}

module.exports = {
  SignupHandler,
  LoginHandler,
  UpdateHandler
}