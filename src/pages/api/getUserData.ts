import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

interface ResponseData {
	user?: any;
	notifications?: any;
	message: string;
}

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const prisma = new PrismaClient();
	let sessionToken = JSON.parse(req.body).sessionToken;

	try {
		const allUsers = await prisma.user.findMany().then(async (users) => {
			const session = await prisma.session
				.findUnique({
					where: {
						token: sessionToken,
					},
				})
				.then((session) => {
					users.forEach(async (user) => {
						if (session && session.userId) {
							console.log(
								user.id,
								decodeURIComponent(session.userId)
							);

							if (
								user.id === decodeURIComponent(session.userId)
							) {
								console.log('User found');

								const notifications = await prisma.notification
									.findMany({
										where: {
											userId: user.id,
										},
									})
									.then(async (notifications) => {
										console.log('got to here x1');
										// res.status(200).json({
										// 	message: 'Retreived user data',
										// 	user: user,
										// 	notifications: notifications,
										// });

										return [user, notifications];
									});

								console.log('got to here x2', notifications);

								return res.status(200).json({
									message: 'got data?',
                                    user: user,
                                    notifications: notifications[1]
								});
								// return [user, notifications];
							}
						}
					});
				});
		});
	} catch (error) {
		res.status(500).json({ message: 'Error while getting users' });
	}
}
