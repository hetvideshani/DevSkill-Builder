import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import User from "@/model/User";

export async function PUT(req: Request) {
	try {
		const data = await req.formData();
		const email = data.get("email") as string | null;
		const file = data.get("file") as File | null;
		const fileName: string = Math.random().toString(36).substring(2, 17);

		if (!file) {
			return NextResponse.json({ success: false, message: "No file uploaded", filePath: null }, { status: 400 });
		}

		if(!email){
			return NextResponse.json({ success: false, message: "No email provided", filePath: null }, { status: 400 });
		}

		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json({ success: false, message: "Invalid file type", filePath: null }, { status: 400 });
		}

		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json({ success: false, message: "File too large", filePath: null }, { status: 400 });
		}

		const byteData = await file.arrayBuffer();
		const buffer:any = Buffer.from(byteData);

		const filePath = path.join(process.cwd(), 'public', 'assets', 'images', 'avatar', `${fileName}.${file.type.split('/')[1]}`);
		try {
			await writeFile(filePath, buffer);
		} catch (err) {
			return NextResponse.json({ success: false, message: "Can't upload this image.", filePath: null }, { status: 400 });
		}
		let user = await User.findOne({email:email});
		if(!user){
			return NextResponse.json({ success: false, message: "User not found", filePath: null }, { status: 404 });
		}

		let realPath = filePath.split('avatar')[1];
		realPath = realPath.substring(1, realPath.length);
		user.image = realPath;
		user.save();
		return NextResponse.json({ success: true, message: "File uploaded successfully!", filePath }, { status: 201 });
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json({ success: false, message: "An error occurred during file upload", filePath: null }, { status: 500 });
	}
}
