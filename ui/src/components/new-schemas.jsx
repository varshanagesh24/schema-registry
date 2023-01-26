import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
let NewSchemas = function() {
	let [ isSaved, setisSaved ] = useState(false);
	let [ isCancelled, setisCancelled ] = useState(false);
	let onSubmit = (e) => {
		e.preventDefault();

		setisSaved(true);
	};
	let onCancelBtnClick = (e) => {
		e.preventDefault();

		setisCancelled(true);
	};

	return (
		<div className="flex flex-col">
			{(isSaved || isCancelled) && <Navigate to="/schemas" replace={true} />}
			<Header displayUserMenu={true} />

			<div className="mx-4 my-8">
				<div className="">
					<div className="text-2xl pb-8">Create Schema</div>
					<form onSubmit={onSubmit} className="w-1/2">
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Name</label>
							<input className="w-full h-8 rounded-md" type="text" />
						</div>
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Version</label>
							<input className="w-full h-8 rounded-md" type="password" />
						</div>
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Active</label>
							<input className="w-8 h-8 rounded-md" type="checkbox" />
						</div>
						<div className="flex p-4">
							<label className="w-24 h-8 pt-1 text-right px-3">Schema</label>
							<textarea className="w-full h-96 rounded-md"> </textarea>
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

export default NewSchemas;
