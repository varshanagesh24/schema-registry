let post = async (data, url) =>
	await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});

let get = async (url) => await fetch(url);

export const login = async (data) => post(data, '/api/login');
export const getSchemas = async () => get('/api/schema');
