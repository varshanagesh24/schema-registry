import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import IconAdd from './icon-add';
import IconEdit from './icon-edit';
import IconView from './icon-view';

let _rows = [
	{ id: 1, name: 'LoginRequestSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 2, name: 'LoginResponseSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 3, name: 'GetSchemasRequestSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 4, name: 'GetSchemasResponseSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 5, name: 'UpdateSchemaRequestSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 6, name: 'UpdateSchemaResponseSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 7, name: 'CreateSchemaRequestSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 8, name: 'CreateSchemaResponseSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 9, name: 'GetSchemaResponseSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' },
	{ id: 10, name: 'GetSchemaResponseSchema', version: '1.0', active: 'Y', createdOn: '12/12/2021' }
];

let Schemas = function() {
	let [ rows, setRows ] = useState([]);
	useEffect(() => {
		//TODO: Load Schemas over here
		setRows(_rows);
	}, []);
	return (
		<div>
			<Header displayUserMenu={true} />
			<div className="mx-4 my-8">
				<div className="text-2xl pb-8">Schemas</div>
				{rows.length === 0 && (
					<div className="-mt-2">
						There are no records for Schemas. Click{' '}
						<Link to="/schemas/new" className="text-decoration-underline text-blue-600 font-bold">
							here
						</Link>{' '}
						to add new Schema
					</div>
				)}
				<div className="py-8">
					{rows.length > 0 && (
						<Fragment>
							<div className="w-[960px] flex justify-end py-2">
								<Link to={`/schemas/new`} className="mx-1 flex">
									<IconAdd className="h-[20px]" /> <span className="h-[20px] -m-1 px-2">Add</span>
								</Link>
							</div>
							<table className="table-fixed border-collapse w-[960px] border border-zinc-200">
								<thead className="bg-zinc-500 h-10 text-white font-normal ">
									<tr>
										<th className="p-2 font-normal text-left w-48">Name</th>
										<th className="p-2 font-normal  w-6">Version</th>
										<th className="p-2 font-normal text-left w-12">Created On</th>
										<th className="p-2 font-normal  w-6">Active</th>
										<th className="p-2 font-normal w-12" />
									</tr>
								</thead>
								<tbody>
									{rows.map((row) => (
										<tr
											key={row.id}
											className={`h-10 p-1 ${row.id % 2 === 0 ? 'bg-zinc-200' : ''}`}
										>
											<td className="p-2">{row.name}</td>
											<td className="p-2 text-center">{row.version}</td>
											<td className="p-2">{row.createdOn}</td>
											<td className="p-2 text-center">{row.active}</td>
											<td className="p-2 flex justify-end">
												<Link to={`/schemas/${row.id}`} className="mx-1">
													<IconView className="h-[20px]" />
												</Link>{' '}
												<Link to={`/schemas/${row.id}/edit`} className="mx-1">
													<IconEdit className="h-[20px]" />
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

export default Schemas;
