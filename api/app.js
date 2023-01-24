var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var livereload = require('livereload');
var connectLiveReload = require('connect-livereload');

var userRoutes = require('./routes/user');

var resourceRoutes = require('./routes/resource');
var schemaRoutes = require('./routes/schema');

const app = express();
const port = 3000;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
	setTimeout(() => {
		liveReloadServer.refresh('/');
	}, 100);
});

app.use(connectLiveReload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(userRoutes);
app.use(resourceRoutes);
app.use(schemaRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
