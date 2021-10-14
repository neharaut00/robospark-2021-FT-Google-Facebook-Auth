const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { googleID, googleSecret, fbID, fbSecret} = require("./secrets.json");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID : googleID,
        clientSecret : googleSecret,
        callbackURL: "http://localhost:3000/google-callback/",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new FacebookStrategy({
    clientID : fbID,
    clientSecret: fbSecret,
    callbackURL: "http://localhost:3000/fb-callback/"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));