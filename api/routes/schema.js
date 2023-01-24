const express = require('express');
const router = express.Router();
var schemaRep = require('../db/resource');

router.get('/schema', (req, res) => {
	schemaRep.getAll().then((data) => res.send(data));
});

router.get('/schema/:id', (req, res) => {
	schemaRep.getAll({ sc_id: req.params.id }).then((data) => res.send(data));
});

router.post('/schema/:id', (req, res) => {
	schemaRep.update(req.body).then((data) => res.send(data));
});

router.post('/schema', (req, res) => {
	schemaRep.create(req.body).then((data) => res.send(data));
});

module.exports = router;
