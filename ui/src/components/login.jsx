import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Header from './Header';

let Login = function() {
	let [ user, setUser ] = useState(null);

	let onLogin = (e) => {
		e.preventDefault();
		//TODO: Invoke Login API with UserId and Password
		// if User is returned, invoke setUser()
		setUser({ name: 'Varsha Nagesh' });
	};

	return (
		<div>
			{user && <Navigate to="/schemas" replace={true} />}
			<Header displayUserMenu={false} />
			<div className="flex flex-col">
				<form onSubmit={onLogin}>
					<div className="w-1/3 bg-zinc-100 p-8 m-auto mt-48">
						<div className="m-auto w-96">
							<div className="text-2xl pb-8">Login</div>
							<div className="flex p-4">
								<label className="w-24 h-8 pt-1 text-right px-3">User Id:</label>
								<input className="w-64 h-8 rounded-md" type="text" />
							</div>
							<div className="flex p-4">
								<label className="w-24 h-8 pt-1 text-right px-3">Password:</label>
								<input className="w-64 h-8 rounded-md" type="password" />
							</div>
							<div className="flex p-4 justify-end">
								<button className="w-48 bg-purple-800 p-2 text-white rounded-full" type="submit">
									Login
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
