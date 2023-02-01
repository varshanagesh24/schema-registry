import { useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from './Header';
import { updateSchema } from '../api';

let EditSchemas = function(user) {
	let [ isSaved, setisSaved ] = useState(false);
	let [ isCancelled, setisCancelled ] = useState(false);
	let schema = useLoaderData();
	const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: schema });

	let onSubmit = (e) => {
		let args = { ...schema, ...e };
		updateSchema(args).then((_) => setisSaved(true));
	};
	let onCancelBtnClick = (e) => {
		setisCancelled(true);
	};
	return (
		<div className="flex flex-col">
			{(isSaved || isCancelled) && <Navigate to="/schemas" replace={true} />}
			<Header displayUserMenu={true} user={user} />

			<div className="mx-4 my-8">
				<div className="">
					<div className="text-2xl pb-8">Edit Schema</div>
					<form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Name</label>
							<input
								className="w-full h-8 rounded-md"
								type="text"
								{...register('name', {
									required: 'Name is a required field',
									minLength: 5,
									maxLength: 150
								})}
							/>
						</div>

						<div className="pl-24 pb-4">
							{errors.name && (
								<p className="pl-1 text-sm text-red-500" role="alert">
									{errors.name && errors.name.message}
								</p>
							)}
							{errors.name &&
							errors.name.type === 'minLength' && (
								<p className="pl-1 text-sm text-red-500" role="alert">
									Name field should have minimum 5 characters
								</p>
							)}
							{errors.name &&
							errors.name.type === 'maxLength' && (
								<p className="pl-1 text-sm text-red-500" role="alert">
									Name field should have maximum 50 characters
								</p>
							)}
						</div>
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Version</label>
							<input
								className="w-full h-8 rounded-md"
								type="text"
								{...register('version', {
									required: 'Version is a required field',
									minLength: 2,
									maxLength: 20
								})}
							/>
						</div>
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Active</label>
							<input className="w-8 h-8 rounded-md" type="checkbox" {...register('active')} />
						</div>
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Schema</label>
							<textarea
								className="w-full h-96 rounded-md"
								{...register('schema', {
									required: 'Schema a required field',
									minLength: 2,
									maxLength: 20
								})}
							/>
						</div>
						<div className="flex p-4 justify-end">
							<button
								className="mx-4 w-48 bg-purple-800 p-2 text-white rounded-full"
								type="button"
								onClick={onCancelBtnClick}
							>
								Cancel
							</button>

							<button className="w-48 bg-purple-800 p-2 text-white rounded-full" type="submit">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditSchemas;
