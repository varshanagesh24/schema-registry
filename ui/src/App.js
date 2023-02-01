import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useState } from 'react';

import { loader as loadSchemas } from './components/schemas';

import { loader as loadSchema } from './components/view-schemas';
import ErrorBoundary from './error-boundary';
import { Suspense } from 'react';
import { Loader } from './components/loader';

import { Provider } from 'react-redux';
import store from './store';

const Login = React.lazy(() => import('./components/login'));
const NewSchemas = React.lazy(() => import('./components/new-schemas'));
const Schemas = React.lazy(() => import('./components/schemas'));
const EditSchemas = React.lazy(() => import('./components/edit-schemas'));
const ViewSchemas = React.lazy(() => import('./components/view-schemas'));

function App() {
	let [ data, setData ] = useState({});

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Login update={(d) => setData({ ...data, login: d })} />
		},
		{
			path: '/schemas',
			element: <Schemas user={data.login} update={(d) => setData({ ...data, schemas: d })} />,
			loader: loadSchemas
		},
		{
			path: '/schemas/new',
			element: <NewSchemas user={data.login} />
		},
		{
			path: '/schemas/:id',
			element: <ViewSchemas user={data.login} schemas={data.schemas} />,
			loader: loadSchema
		},
		{
			path: '/schemas/:id/edit',
			element: <EditSchemas user={data.login} schemas={data.schemas} />,
			loader: loadSchema
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
			<ErrorBoundary>
				<Suspense fallback=<Loader />>
					<Provider store={store}>
						<RouterProvider router={router} />
					</Provider>
				</Suspense>
			</ErrorBoundary>
		</React.StrictMode>
	);
}

export default App;
