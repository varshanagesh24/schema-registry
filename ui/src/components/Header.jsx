import IconLogo from './icon-logo';
import IconUser from './icon-user';

let Header = function({ displayUserMenu }) {
	return (
		<div className="flex bg-zinc-300">
			<div className="m-2">
				<IconLogo className="w-10" />
			</div>
			<div className="basis-full m-2 text-3xl">Schema Registry</div>
			{displayUserMenu && (
				<div className="w-16 m-2">
					<IconUser className="w-10" />
				</div>
			)}
		</div>
	);
};

export default Header;
