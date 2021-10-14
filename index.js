const express = require('express')
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const app = express();

app.use(cookieSession({
  name: 'facebook-auth-session',
  keys: ['key1', 'key2']
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

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("You are not logged in")
})

app.get("/failed", (req, res) => {
  res.send("Failed")
})

app.get("/success", isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`)
})

app.get('/facebook',passport.authenticate('facebook'));

app.get('/callback',passport.authenticate('facebook', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect('/success');
    });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.listen(port,()=>{
  console.log(`Server is running at the port ${port}`)
})