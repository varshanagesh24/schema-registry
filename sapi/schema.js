// Require the framework and instantiate it
const api = require('lambda-api')();
var schemaRep = require('./db/schema');
const Ajv = require('ajv');
const { checkApiKey } = require('./api-key-check');

const ajv = new Ajv();
const createschemasValidator = ajv.compile(require('./schemas/create-schemas.json'));

api.use(checkApiKey);

api.get('/api/schema', async (req, res) => {
	return schemaRep.getAll();
});

api.get('/api/schema/:id', async (req, res) => {
	return schemaRep.getAll({ sc_id: req.params.id }).then((data) => data[0]);
});

api.post('/api/schema', async (req, res) => {
	const valid = createschemasValidator(req.body);
	if (!valid) {
		res.status(401).send(createschemasValidator.errors);
		return;
	}

	return schemaRep.create(req.body).then((_) => schemaRep.getAll({ sc_id: req.body.sc_id })).then((data) => data[0]);
});

const updateschemasValidator = ajv.compile(require('./schemas/update-schemas.json'));

api.post('/api/schema/:id', async (req, res) => {
	const valid = updateschemasValidator(req.body);
	if (!valid) {
		res.status(401).send(updateschemasValidator.errors);
		return;
	}

	return schemaRep.update(req.body).then((_) => schemaRep.getAll({ sc_id: req.body.sc_id })).then((data) => data[0]);
});

// Declare your Lambda handler
exports.handler = async (event, context) => {
	// Run the request
	return await api.run(event, context);
};
