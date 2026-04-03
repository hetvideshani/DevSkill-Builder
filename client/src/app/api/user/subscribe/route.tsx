// make a route for the subscribe page, change only notifications field true in user model
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import UserModel from '../../../../model/User';
import { cookies } from 'next/headers';

export async function PATCH(req: Request) {
	await dbConnect();
	try {
		const jwt = cookies().get("token");
		if (!jwt) {
			return NextResponse.json(
				{ success: false, message: 'User doesn\'t found with jwt.', data: false },
				{ status: 401 }
			);
		}
		const user = await UserModel.findOne({ token: jwt.value });
		if (!user) {
			return NextResponse.json(
				{ success: false, message: 'User doesn\'t found with jwt.', data: false },
				{ status: 401 }
			);
		}

		user.notifications = true;
		await user.save();

		return NextResponse.json(
			{ success: true, message: 'You Subscribed Successfully.', data: null },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('Error while authenticating user:' + error.message);
		return NextResponse.json(
			{ success: false, message: 'Error while fetching user', data: false },
			{ status: 500 }
		);
	}
}