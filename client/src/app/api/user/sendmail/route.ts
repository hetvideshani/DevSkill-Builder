import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

const generateVerificationCode = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 });
		}

		await dbConnect();

		const otp = generateVerificationCode();

		await UserModel.updateOne(
			{ email: email },
			{
				$set: {
					verifyToken: otp,
					verifyTokenExpiry: Date.now() + 6 * 60 * 1000
				}
			}
		);

		return NextResponse.json({success:true, message: 'Verification code generated successfully', code: otp },{status:200});
	} catch (error) {
		console.error('Error generating verification code:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}