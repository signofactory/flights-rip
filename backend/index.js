//Requires dependencies
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require("body-parser"); //Required to pass responses through auth middleware
const mongoose = require('mongoose')
const passport = require("passport")
const session = require ("cookie-session")

//Allows to read dotenv
dotenv.config();

//Declares server
const server = express()

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
      next();
  }
});



//Requires Models
require("./models/User");
require("./models/Search");
// require("./models/Comment");
// require("./models/Like");



//Requires API routes
const authRouter = require('./routes/auth')
const searchesRouter = require('./routes/searches')

// Options for server
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  session({
    // domain: '.app.localhost',
    secret: process.env.COOKIE_SECRET,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
);
server.use(passport.initialize());
server.use(passport.session());



// Registers routes
server.get("/api", (request, response) =>{
  response.send({message: 'I am running'})
});
server.use('/api/v1/searches', searchesRouter)
server.use('/api/v1/auth', authRouter)


//Requires passport config
require("./services/passport");


//Defines server port (if declared from env file otherwise on port 5000)
const port = process.env.PORT || 5000;


//Connects or create db and then starts server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server started on port ${port}!`)
    })
  })
  .catch(err => console.error('Something went wrong', err))