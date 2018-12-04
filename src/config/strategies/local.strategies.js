const passport = require('passport');
const {Strategy}  = require('passport-local');
const HttpConnector = require('../../db/index');

const debug = require('debug')('app:localStrategies');

const httpConnector = new HttpConnector();

const localStrategy = () =>{
passport.use(new Strategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },(username, password, done) => {
        (async function mongo() {
            const user = await httpConnector.getUserByName(username,'library', 'users');
            if (user.password === password){
                done(null,user);
            } else {
                done(null,false);
            }
          }());
       
    }
))

};
module.exports = localStrategy;
