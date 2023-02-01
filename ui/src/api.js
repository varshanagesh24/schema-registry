let post = async (data, url) => {
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
};

let get = async (url) => {
	let response = await fetch(url);
	return await response.json();
};

export const login = async (data) => post(data, '/api/login');
export const getSchemas = async () => get('/api/schema');
export const createSchema = async (data) => post(data, '/api/schema');
export const getSchemaById = async (id) => get(`/api/schema/${id}`);
export const updateSchema = async (data) => post(data, `/api/schema/${data.sc_id}`);
