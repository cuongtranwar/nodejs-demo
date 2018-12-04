const express = require('express');
const HttpConnector = require('../db/index');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const AuthRouter = express.Router();
const httpConnector = new HttpConnector();
debug("Cuong AUTH");

const routes = (nav) => {
  AuthRouter.post('/signUp', async (rep, res) => {
    debug(rep.body);
    const result = await httpConnector.insertUser('users',rep.body,'library');
    rep.login(result.ops[0], () =>
      res.redirect('/auth/profile'))
});
AuthRouter.all((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}).get('/profile', (rep, res) => {
  res.json(rep.user);
});

// AuthRouter.get('/signIn', (rep, res) => {
//   res.render('signIn',{
//     nav,
//     title: 'Sign In'
//   });
// }).post(passport.authenticate('local', {
//   successRedirect: '/auth/profile',
//   failureRedirect: '/'
// }));

AuthRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));


return AuthRouter;
};

module.exports = routes;
