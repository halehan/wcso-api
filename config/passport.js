var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

var JWT_STRATEGY_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

// load up the user model
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
 var opts = {};
 opts.secretOrKey = config.secret;
 passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   User.findOne({id: jwt_payload.id}, function(err, user) {
         if (err) {
             return done(err, false);
         }
         if (user) {
             done(null, user);
         } else {
             done(null, false);
         }
     });
 }));
};