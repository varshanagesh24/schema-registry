import IconLogo from './icon-logo';
import IconUser from './icon-user';
import { useSelector } from 'react-redux';

let Header = function({ displayUserMenu }) {
	const user = useSelector((state) => state.registry.user);
	return (
		<div className="flex bg-zinc-300">
			<div className="m-2">
				<IconLogo className="w-10" />
			</div>
			<div className="basis-full m-2 text-3xl">Schema Registry</div>
			{displayUserMenu && (
				<div className="w-16 m-2">
					<IconUser className="w-10" tooltip={user && user.name} />
				</div>
			)}
		</div>
	);
};

export default Header;
