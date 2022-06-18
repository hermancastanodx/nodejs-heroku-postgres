const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
// const bcrypt = require('bcrypt');
const _ = require('lodash');
const {
  User,
  validate
} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const pool = require('../startup/postgresdb');

// crypto thing
var crypto = require('crypto');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});


router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, results) => {
    if (error) {
      throw error
    }
    let {user} = results.rows;
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    // Creating a unique salt for a particular user 
    // const salt = crypto.randomBytes(16).toString('hex'); 
    const salt = '1234';
    // Hashing user's salt and password with 1000 iterations, 
    user.password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, `sha512`).toString(`hex`);

    // insert user here
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.password], (error, results) => {
      if (error) {
        throw error
      }
      const token = user.generateAuthToken();
      res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    })
  })
});

/*
router.post('/a', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  // Creating a unique salt for a particular user 
  // const salt = crypto.randomBytes(16).toString('hex'); 
  const salt = '1234';
  // Hashing user's salt and password with 1000 iterations, 
  user.password = crypto.pbkdf2Sync(user.password, salt, 1000, 64, `sha512`).toString(`hex`);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});
*/

module.exports = router;