import { Bell, User } from 'lucide-react';
import { toast } from './components/ui/use-toast';

import { Avatar, Badge } from '@nextui-org/react';
import { useState } from 'react';

function Navbar() {
	const [notis] = useState([
		{
			title: 'Welcome! 🎉',
			desc: "Make sure to create an accout if you don't have one already. You will be able to track your progress and save your favorite games.",
		},
	]);

	const [userNotis] = useState([
		{
			id: 'settings',
		},
	]);

	// function addNoti(title: string, desc: string) {
	// 	setNotis([...notis, { title, desc }]);
	// }

	return (
		<header className="w-full h-15">
			<nav className="z-20 w-full h-15 flex items-center justify-center px-10 py-4 bg-gray-900">
				<div className="max-w-7xl w-full h-full flex justify-between dark:bg-gray-900">
					<div className="flex justify-between gap-20">
						<div className="self-center font-medium dark:text-gray-100 ">
							compy.
						</div>
						<div className="self-center">
							<a
								href="#"
								className="text-gray-900 px-3 rounded-2xl text-sm font-medium dark:text-gray-100"
								aria-current="page"
							>
								Dashboard
							</a>
							<a
								href="#"
								className="text-gray-500 px-3 rounded-2xl text-sm font-medium dark:text-gray-100"
							>
								Search Games
							</a>
							<a
								href="#"
								className="text-gray-500 px-3 rounded-2xl text-sm font-medium dark:text-gray-100 dark:bg-blue-700 inline-block h-15 py-1"
							>
								Join Game
							</a>
						</div>
					</div>
					<div className="flex gap-8">
						<a
							href="#"
							className="text-gray-500 py-2 rounded-2xl text-sm font-medium dark:text-gray-100 relative"
						>
							<Badge
								content={notis.length > 0 ? notis.length : ''}
								className={
									notis.length > 0
										? 'text-white pointer-events-none'
										: 'hidden'
								}
								color={notis.length > 0 ? 'primary' : 'success'}
							>
								<Bell id="notificationBell" />
							</Badge>
							{/* notifcation menu that opens on bell click */}
							<div
								id="noti-menu"
								className="w-96 z-20 hidden absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								{notis.map((noti, index) => (
									<div key={index} className="px-1 py-1">
										<div
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => {
												toast({
													title: noti.title,
													description: noti.desc,
												});
											}}
										>
											<div className="text-lg font-medium">
												{noti.title}
											</div>
											<div className="text-sm font-light">
												{noti.desc}
											</div>
										</div>
									</div>
								))}
								<div className="px-1 py-1 ">
									<div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										View all
									</div>
								</div>
							</div>
						</a>
						<a
							href="#"
							className="text-gray-500 py-2 rounded-2xl text-sm font-medium dark:text-gray-100 relative"
						>
							<Badge
								content={
									userNotis.length > 0 ? userNotis.length : ''
								}
								className={
									userNotis.length > 0
										? 'text-white pointer-events-none'
										: 'hidden'
								}
								color={
									userNotis.length > 0 ? 'primary' : 'success'
								}
							>
								<User id="userIcon" />
							</Badge>
							{/* notifcation menu that opens on bell click */}
							<div
								id="user-menu"
								className="w-52 z-20 hidden absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<div className="px-1 py-1">
									<div className="block px-4 py-2 text-sm text-gray-700">
										<div className="h-14 mb-2 flex items-center justify-between">
											<div className="text-xl font-medium ">
												Account
											</div>
											<div className="text-lg font-light flex items-center">
												<Avatar
												// src="https://i.pravatar.cc/150?u=a04258114e29026702d"
												/>
											</div>
										</div>
										<div className="text-lg font-light hover:bg-gray-300 py-2 px-2 -ml-1">
											Settings
										</div>

										<div className="text-lg font-light hover:bg-gray-300 py-2 px-2 -ml-1">
											Sign Out
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
