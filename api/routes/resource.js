const express = require('express');
const router = express.Router();
var resourceRep = require('../db/resource');

router.get('/resource/groupByPage', (req, res) => {
	resourceRep.getResourceMinView().then((data) => groupBy(data, 'page')).then((data) => res.send(data));
});

router.get('/resource', (req, res) => {
	resourceRep.getAll().then((data) => res.send(data));
});

router.post('/resource', (req, res) => {
	resourceRep.create(req.body).then((data) => res.send(data));
});

router.post('/resource/:id', (req, res) => {
	resourceRep.update(req.body).then((data) => res.send(data));
});

module.exports = router;
