import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Login from './components/login';
import Schemas from './components/schemas';
import NewSchemas from './components/new-schemas';
import ViewSchemas from './components/view-schemas';
import EditSchemas from './components/edit-schemas';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Login />
		},
		{
			path: '/schemas',
			element: <Schemas />
		},
		{
			path: '/schemas/new',
			element: <NewSchemas />
		},
		{
			path: '/schemas/:id',
			element: <ViewSchemas />
		},
		{
			path: '/schemas/:id/edit',
			element: <EditSchemas />
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
