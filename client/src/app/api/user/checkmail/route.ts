import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(req: Request) {
	try {
		const { email, otp } = await req.json();

		if (!email || !otp) {
			return NextResponse.json({ error: 'Credentials are required' }, { status: 400 });
		}

		await dbConnect();

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		if (Date.now() > user.verifyTokenExpiry) {
			return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
		}

		if (user.verifyToken !== otp) {
			return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
		}

		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		user.verified.expiry_date = Date.now()+(15*24*60*60*1000);
		user.verified.isVerified = true;
		await user.save();

		return NextResponse.json({success:true, message: 'Email verified successfully' },{status:200});
	} catch (error) {
		console.error('Error verifying OTP:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}