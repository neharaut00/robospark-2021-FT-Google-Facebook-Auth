const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { clientID, clientSecret } = require("./secrets.json");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID,
        clientSecret,
        callbackURL: "http://localhost:3000/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));