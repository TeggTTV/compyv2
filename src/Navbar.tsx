import { Bell, SunMoon, User } from 'lucide-react';
import { toast } from './components/ui/use-toast';

function Navbar() {
	return (
		<nav className="w-full h-15 flex items-center justify-center px-10 py-4 bg-gray-900">
			<div className="max-w-7xl w-full h-full flex justify-between dark:bg-gray-900">
				<div className="flex justify-between gap-10">
					<div className="self-center font-medium dark:text-gray-100 ">
						compy.
					</div>
					<div className="self-center">
						<a
							href="#"
							className="text-gray-900 px-3 rounded-md text-sm font-medium dark:text-gray-100"
							aria-current="page"
						>
							Dashboard
						</a>
						<a
							href="#"
							className="text-gray-500 px-3 rounded-md text-sm font-medium dark:text-gray-100"
						>
							Team
						</a>
						<a
							href="#"
							className="text-gray-500 px-3 rounded-md text-sm font-medium dark:text-gray-100"
						>
							Projects
						</a>
						<a
							href="#"
							className="text-gray-500 px-3 rounded-md text-sm font-medium dark:text-gray-100"
						>
							Calendar
						</a>
					</div>
				</div>
				<div className="flex gap-8">
					<a
						href="#"
						className="text-gray-500 py-2 rounded-md text-sm font-medium dark:text-gray-100"
					>
						<SunMoon
							onClick={() => {
								const html = document.querySelector('html');
								html?.classList.toggle('dark');
							}}
						/>
					</a>

					<a
						href="#"
						className="text-gray-500 py-2 rounded-md text-sm font-medium dark:text-gray-100"
					>
						<Bell
							id="notificationBell"
							// onClick={() => {
							// 	document
							// 		.getElementById('noti-menu')
							// 		?.classList.toggle('hidden');
							// }}
						/>
						{/* notifcation menu that opens on bell click */}
						<div
							id="noti-menu"
							className=" z-20 hidden absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div className="px-1 py-1">
								{/* <a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700"
								>
									View all
								</a> */}
							</div>
						</div>
					</a>
					<a
						href="#"
						className="text-gray-500 py-2 rounded-md text-sm font-medium dark:text-gray-100"
						onClick={() => {
							toast({
								title: 'Scheduled: Catch up',
								description:
									'Friday, February 10, 2023 at 5:57 PM',
							});
						}}
					>
						<User />
					</a>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
