var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

var userRep = require('./user');


const app = express()
const port = 3000

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// GET /resources
// POST /login
// GET  /schema
// GET  /schema/id
// POST /schema 
// POST /schema/id 

app.get('/user', (req, res) => {
    userRep.getUser().then(data => res.send(data));
  })

app.get('/resource', (req, res) => {
    res.send('Resources')
  })

  app.post('/login', (req, res) => {
    res.send('login')
  })

  app.get('/schema', (req, res) => {
    res.send('schema')
  })

  app.get('/schema/:id', (req, res) => {
    res.send('schema/:id' + id)
  })

  app.post('/schema', (req, res) => {
    res.send('post schema')
  })

  app.get('/schema/:id', (req, res) => {
    res.send('post schema:id')
  })
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

module.exports = app;
