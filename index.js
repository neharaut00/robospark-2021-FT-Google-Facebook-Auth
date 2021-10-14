const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
var path = require('path');
require('./passport');

const app = express();

var options = {
    root: path.join(__dirname)
};

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['googleLogin']
}))

app.use(cookieSession({
    name: 'facebook-auth-session',
    keys: ['fbLogin']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());
// server static files (CSS/Images)
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    // res.send("You are not logged in")
    res.sendFile('templates/login.html', options);
})

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.displayName}`)

})

app.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/google-callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),

    function(req, res) {
        res.redirect('/success')
    }
);

app.get('/facebook', passport.authenticate('facebook'));

app.get('/fb-callback', passport.authenticate('facebook', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect('/success');
    });

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(port, () => console.log("server running on port: " + port))