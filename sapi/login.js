// Require the framework and instantiate it
const api = require('lambda-api')();
var userRep = require('./db/user');
const Ajv = require('ajv');
const { checkApiKey } = require('./api-key-check');

// Define a route
const ajv = new Ajv();
const loginRequestValidator = ajv.compile(require('./schemas/login-request.json'));

api.use(checkApiKey);

api.post('/api/login', async (req, res) => {
	const valid = loginRequestValidator(req.body);
	if (!valid) {
		res.status(401).send(loginRequestValidator.errors);
		return;
	}

	return userRep
		.getAll({ userid: req.body.userid, passwordHash: req.body.password, active: 'Y' })
		.then(
			(data) => (data.length === 1 ? { name: data[0].name, active: data[0].active, userid: data[0].userid } : {})
		);
});

// Declare your Lambda handler
exports.handler = async (event, context) => {
	// Run the request
	return await api.run(event, context);
};
