const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { clientID, clientSecret } = require("./secrets.json");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID,
  clientSecret,
  callbackURL: "http://localhost:3000/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}

));