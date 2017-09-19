const express = require('express');
const passport = require('passport');
const User = require('../models/User.js');

module.exports = app => {
  // POST to /register
  app.post('/api/register', (req, res) => {
    // Create a user object to save, using values from incoming JSON
    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    // Save, via passport's "register" method, the user
    User.register(newUser, req.body.password, (err, user) => {
      // If there's a problem, send back a JSON object with the error
      if (err) {
        return res.send(JSON.stringify({ error: err }));
      }
      // Otherwise, for now, send back a JSON object with the new user's info
      return res.send(JSON.stringify(user));
    });
  });

  app.post('/api/login', (req, res) => {
    passport.authenticate('local')(req, res, () => {
      // If logged in, we should have user info to send back
      if (req.user) {
        return res.send(JSON.stringify(req.user));
      }

      // Otherwise return an error
      return res.send(JSON.stringify({ error: 'There was an error logging in' }));
    });
  });

  // GET to /logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    return res.send(JSON.stringify(req.user));
  });

}
