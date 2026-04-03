import { NextResponse } from "next/server";
import { LANGUAGE_VERSIONS } from "@/app/constants";
import ProblemModel from '@/model/Problem';
import UserModel from '@/model/User';
import dbConnect from "@/lib/dbConnect";
import { setTimeout as sleep } from "timers/promises";
import { Compiler } from "@/components/Compiler";
import { log } from "console";

interface ex {
	input: string,
	output: string
}

export async function POST(req: Request) {
	let { code, language, submit, email } = await req.json();
	const id = req.url.split("compiler/")[1];

	if (!email) {
		return NextResponse.json({ status: 406, error: "User is not authenticate.", message: "" });
	}

	await dbConnect();
	const problem = await ProblemModel.findOne({ problem_id: id });
	let examples: any;

	if (problem) {
		examples = problem.examples;
	} else {
		return NextResponse.json({ status: 200, message: "nthi mlto object j" });
	}

	let range;

	if (submit == true) {
		range = examples.length
	} else {
		range = 3
	}

	let user;
	if (submit) user = await UserModel.findOne({ email: email });

	for (let x: number = 0; x < range; x++) {
		const data = await callapi(language, code, examples[x]);

		if (data) {
			if (data.status == 201) {
				data.message = data.message.replace("\n", "");
				if (data.message.toLowerCase() !== examples[x].output.toLowerCase()) {
					if (submit) {
						user.history.push({ problemID: problem.problem_id, problem_title: problem.problem_title, status: false, language: language, code: code })
						await user.save();
					}
					return NextResponse.json({ status: 405, error: examples[x], message: `wrong output on test case ${x + 1}` });
				}
			}
			else {
				if (submit) {
					user.history.push({ problemID: problem.problem_id, problem_title: problem.problem_title, status: false, language: language, code: code });
					await user.save();
				}
				if (data.status == 401) {
					return NextResponse.json({ status: 401, error: data.message, message: "" });
				} else if (data.status == 402) {
					return NextResponse.json({ status: 402, error: data.message, message: "" });
				} else if (data.status == 403) {
					return NextResponse.json({ status: 403, error: "Error While Fetching Data", message: "" });
				}
			}
		}

		await sleep(2500);
	}

	if (submit) {

		user.solvedQuestion.push(problem._id);
		user.history.push({ problemID: problem.problem_id, problem_title: problem.problem_title, status: true, language: language, code: code });
		await user.save();
	}

	return NextResponse.json({ status: 200, error: "", message: "Code Compiled successfully in all testcases." });
}

export const COMPILER_IDS: Record<string, string> = {
	python: "python-3.14",
	python3: "python-3.14",
	c: "gcc-15",
	"c++": "g++-15",
	cpp: "g++-15",
	java: "openjdk-25",
	csharp: "dotnet-csharp-9",
	"c#": "dotnet-csharp-9",
	fsharp: "dotnet-fsharp-9",
	"f#": "dotnet-fsharp-9",
	go: "go-1.26",
	rust: "rust-1.93",
	php: "php-8.5",
	ruby: "ruby-4.0",
	haskell: "haskell-9.12",
	typescript: "typescript-deno",
	ts: "typescript-deno",
};

const API_KEY = process.env.VITE_COMPILER_API_KEY || '';

console.log(API_KEY);

const callapi = async (language: string, code: string, ex: ex) => {
	let api: string = "https://api.onlinecompiler.io/api/run-code-sync/";
	let data = {
		compiler: COMPILER_IDS[language.toLowerCase()],
		code,
		input: ex.input
	}
	console.log("example --- ", ex);
	console.log("data --- ", data);

	const response = await fetch(api, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			Authorization: API_KEY
		},
		body: JSON.stringify(data),
	}).then(res => res.json());

	console.log(response);

	if (response.status == "success") {
		return { status: 201, message: response.output }
	}
	else if (response.status == "error") {
		return { status: 401, message: response.error }
	}
}
