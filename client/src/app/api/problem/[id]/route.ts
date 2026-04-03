import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProblemModel from "@/model/Problem";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request) {
	const id = req.url.split("problem/")[1];
	if (!id) {
		return NextResponse.json({
			success: false,
			message: "Invalid parameters"
		}, { status: 400 });
	}

	// Convert id to string if it's not already
	const problemId = typeof id === 'string' ? id : String(id);

	await dbConnect();
	try {
		const problem = await ProblemModel.findOne({ problem_id: problemId });

		if (!problem) {
			return NextResponse.json({
				success: false,
				message: "Problem not found"
			}, { status: 404 });
		}

		return NextResponse.json({ problem }, { status: 200 });
	} catch (error) {
		console.error("Error while fetching problem data", error);
		return NextResponse.json({
			success: false,
			message: "Error while fetching problem data"
		}, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	const id = req.url.split("problem/")[1];
	if (!id) {
		return NextResponse.json({
			success: false,
			message: "Invalid parameters"
		}, { status: 400 });
	}

	// Convert id to string if it's not already
	const problemId = typeof id === 'string' ? id : String(id);

	await dbConnect();
	try {
		const problem = await ProblemModel.deleteOne({ problem_id: problemId });

		if (!problem) {
			return NextResponse.json({
				success: false,
				message: "Problem not found"
			}, { status: 404 });
		}

		return NextResponse.json({ message: "Problem deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error while deleting problem data", error);
		return NextResponse.json({
			success: false,
			message: "Error while delete problem data"
		}, { status: 500 });
	}
}


export async function PUT(req: Request) {
	const id = req.url.split("problem/")[1];
	if (!id) {
		return NextResponse.json({
			success: false,
			message: "Invalid parameters"
		}, { status: 400 });
	}

	// Convert id to string if it's not already
	const problemId = typeof id === 'string' ? id : String(id);
	
	await dbConnect();
	try {
		const { problem_id, problem_title, time_limit, max_memory, problem_statement, input_statement, output_statement, examples, level, category } = await req.json();

		const problem = await ProblemModel.findByIdAndUpdate(problemId, { problem_id, problem_title, time_limit, max_memory, problem_statement, input_statement, output_statement, examples, level, category });

		if (!problem) {
			return NextResponse.json({
				success: false,
				message: "Problem not found"
			}, { status: 404 });
		}

		return NextResponse.json({ problem }, { status: 200 });
	} catch (error) {
		console.error("Error while updating problem data", error);
		return NextResponse.json({
			success: false,
			message: "Error while updating problem data"
		}, { status: 500 });
	}
}