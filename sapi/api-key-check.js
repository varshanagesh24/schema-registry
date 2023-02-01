exports.checkApiKey = function checkApiKey(req, res, next) {
	if (req.headers['x-api-key'] !== process.env.apikey) {
		res.error(401, 'Not Authorised');
	} else {
		next();
	}
};
