import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/login';
import Schemas from './components/schemas';
import NewSchemas from './components/new-schemas';
import ViewSchemas from './components/view-schemas';
import EditSchemas from './components/edit-schemas';

function App() {
	let [ data, setData ] = useState({});

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Login update={(d) => setData({ ...data, login: d })} />
		},
		{
			path: '/schemas',
			element: <Schemas user={data.login} update={(d) => setData({ ...data, schemas: d })} />
		},
		{
			path: '/schemas/new',
			element: <NewSchemas user={data.login} schemas={data.schemas} />
		},
		{
			path: '/schemas/:id',
			element: <ViewSchemas user={data.login} schemas={data.schemas} />
		},
		{
			path: '/schemas/:id/edit',
			element: <EditSchemas user={data.login} schemas={data.schemas} />
		}
	]);

	// Login
	// View Schemas
	// Edit Schema
	// Add Schema
	// View Schema
	// View Version History

	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}

export default App;
