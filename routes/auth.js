const Joi = require('joi');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var crypto = require('crypto'); 

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // Creating a unique salt for a particular user 
  // const salt = crypto.randomBytes(16).toString('hex'); 
  const salt = '1234';
  // Hashing user's salt and password with 1000 iterations, 
  const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`); 
  
  if (user.password !== hashedPassword) return res.status(400).send(`Invalid email or password. req:  ${hashedPassword} db: ${user.password}`);

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
