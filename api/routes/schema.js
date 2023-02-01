const express = require('express');
const router = express.Router();
var schemaRep = require('../db/schema');
const Ajv = require('ajv');

const ajv = new Ajv();
const createschemasValidator = ajv.compile(require('../schemas/create-schemas.json'));

router.get('/schema', (req, res) => {
	schemaRep.getAll().then((data) => res.send(data));
});
router.post('/schema', (req, res) => {
	const valid = createschemasValidator(req.body);
	if (!valid) {
		res.status(401).send(createschemasValidator.errors);
		return;
	}

	schemaRep
		.create(req.body)
		.then((_) => schemaRep.getAll({ sc_id: req.body.sc_id }))
		.then((data) => res.send(data[0]));
});

const ajv1 = new Ajv();
const updateschemasValidator = ajv.compile(require('../schemas/update-schemas.json'));

router.get('/schema', (req, res) => {
	schemaRep.getAll().then((data) => res.send(data));
});
router.post('/schema/:id', (req, res) => {
	const valid = updateschemasValidator(req.body);
	if (!valid) {
		res.status(401).send(updateschemasValidator.errors);
		return;
	}

	schemaRep
		.update(req.body)
		.then((_) => schemaRep.getAll({ sc_id: req.body.sc_id }))
		.then((data) => res.send(data[0]));
});

router.get('/schema/:id', (req, res) => {
	schemaRep.getAll({ sc_id: req.params.id }).then((data) => res.send(data[0]));
});

router.post('/schema/:id', (req, res) => {
	schemaRep.update(req.body).then((data) => res.send(data));
});

router.post('/schema', (req, res) => {
	schemaRep.create(req.body).then((data) => res.send(data));
});

module.exports = router;
