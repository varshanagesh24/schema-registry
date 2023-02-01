import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api';

import Header from './Header';

let Login = function({ update }) {
	const { register, handleSubmit, formState: { errors } } = useForm();
	let [ user, setUser ] = useState(null);

	let onLogin = async (data) => {
		let currentUser = await login(data);
		update(currentUser);
		setUser(currentUser);
	};

	return (
		<div>
			{user && <Navigate to="/schemas" replace={true} />}
			<Header displayUserMenu={false} />
			<div className="flex flex-col">
				<form onSubmit={handleSubmit(onLogin)}>
					<div className="w-1/3 bg-zinc-100 p-8 m-auto mt-48">
						<div className="m-auto w-96">
							<div className="text-2xl pb-8">Login</div>
							<div>
								<div className="flex pt-4">
									<label className="w-24 h-8 pt-1 text-right px-3">User Id:</label>
									<input
										className="w-64 h-8 rounded-md"
										type="text"
										{...register('userid', {
											required: 'User Id is a required field',
											minLength: 5,
											maxLength: 20
										})}
									/>
								</div>
								<div className="pl-24 pb-4">
									{errors.userid && (
										<p className="pl-1 text-sm text-red-500" role="alert">
											{errors.userid && errors.userid.message}
										</p>
									)}
									{errors.userid &&
									errors.userid.type === 'minLength' && (
										<p className="pl-1 text-sm text-red-500" role="alert">
											User Id field should have minimum 5 characters
										</p>
									)}
									{errors.userid &&
									errors.userid.type === 'maxLength' && (
										<p className="pl-1 text-sm text-red-500" role="alert">
											User Id field should have maximum 20 characters
										</p>
									)}
								</div>
							</div>
							<div>
								<div className="flex pt-4">
									<label className="w-24 h-8 pt-1 text-right px-3">Password:</label>
									<input
										className="w-64 h-8 rounded-md"
										type="password"
										{...register('password', {
											required: 'Password is a required field',
											minLength: 5,
											maxLength: 20
										})}
									/>
								</div>
								<div className="pl-24 pb-4">
									{errors.password && (
										<p className="pl-1 text-sm text-red-500" role="alert">
											{errors.password && errors.password.message}
										</p>
									)}
									{errors.password &&
									errors.password.type === 'minLength' && (
										<p className="pl-1 text-sm text-red-500" role="alert">
											Password field should have minimum 5 characters
										</p>
									)}
									{errors.password &&
									errors.password.type === 'maxLength' && (
										<p className="pl-1 text-sm text-red-500" role="alert">
											Password field should have maximum 20 characters
										</p>
									)}
								</div>
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
