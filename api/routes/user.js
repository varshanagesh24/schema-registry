const express = require('express');
const router = express.Router();
var userRep = require('../db/user');

router.get('/user', (req, res) => {
	userRep.getAll().then((data) => res.send(data));
});

router.post('/login', (req, res) => {
	userRep
		.getAll({ userid: req.body.userid, passwordHash: req.body.password, active: 'Y' })
		.then(
			(data) =>
				data.length === 1
					? res.send({ name: data[0].name, active: data[0].active, userid: data[0].userid })
					: {}
		);
});

router.post('/user/:id', (req, res) => {
	userRep.update(req.body).then((data) => userRep.getAll({ userid: req.body.userid })).then((data) => res.send(data));
});

router.post('/user', (req, res) => {
	userRep.create(req.body).then((data) => res.send(data));
});

module.exports = router;
