import { useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import Header from './Header';
import { getSchemaById } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSchema } from '../registrySlice';
export async function loader({ params }) {
	return getSchemaById(params.id);
}

let ViewSchemas = function({ user }) {
	let [ isCancelled, setisCancelled ] = useState(false);

	//const schema = useLoaderData();
	let dispatch = useDispatch();
	dispatch(setCurrentSchema(useLoaderData()));
	const schema = useSelector((state) => state.registry.currentSchema);

	let onCancelBtnClick = (e) => {
		setisCancelled(true);
	};

	return (
		<div className="flex flex-col">
			{isCancelled && <Navigate to="/schemas" replace={true} />}
			<Header displayUserMenu={true} user={user} />

			<div className="mx-4 my-8">
				<div className="w-1/2">
					<div className="text-2xl pb-8">View Schema</div>
					<div className="flex p-4">
						<label className="w-24 h-8 pt-1 text-right px-3">Name</label>
						<label className="w-full h-8 pt-1">{schema.name}</label>
					</div>
					<div className="flex p-4">
						<label className="w-24 h-8 pt-1 text-right px-3">Version</label>
						<label className="w-full h-8 pt-1">{schema.version}</label>
					</div>
					<div className="flex p-4">
						<label className="w-24 h-8 pt-1 text-right px-3">Active</label>
						<label className="w-full h-8 pt-1">{schema.active}</label>
					</div>
					<div className="flex p-4">
						<label className="w-24 h-8 pt-1 text-right px-3">Schema</label>
						<div className="w-full pt-1">{schema.schema}</div>
					</div>
					<div className="flex p-4 justify-end">
						<button
							className="mx-4 w-48 bg-purple-800 p-2 text-white rounded-full"
							type="button"
							onClick={onCancelBtnClick}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewSchemas;
