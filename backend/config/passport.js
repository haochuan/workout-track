const LocalStrategy = require('passport-local').Strategy;

import User from '../models/User';

export default function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });
  
  passport.use('local-signin', new LocalStrategy(
    function(req, email, password, done) {
      User.findOne({ email: req.email }, function(err, user) {
        console.log('ssss');
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      User.findOne({ 'email': email }, function(err, user) {
          // if there are any errors, return the error
        if (err)
          return done(err);
        // check to see if theres already a user with that email
        if (user) {
          console.log('Email already taken.');
          return done(null, false, { message: 'Email already taken.' });
        } else {
           // if there is no user with that email
          // create the user
          let user = new User({
            email: req.body.email,
            password: req.body.password
          });
          user.save((err, data) => {
            if (err) {
              throw(err);
            } else {
              return done(null, data);
            }
          });
        }
      });
    }
  ));
}