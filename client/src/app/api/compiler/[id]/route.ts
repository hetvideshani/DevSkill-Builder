import { NextResponse } from "next/server";
import { LANGUAGE_VERSIONS } from "@/app/constants";
import ProblemModel from '@/model/Problem';
import UserModel from '@/model/User';
import dbConnect from "@/lib/dbConnect";
import { setTimeout as sleep } from "timers/promises";

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

const callapi = async (language: string, code: string, ex: ex) => {
	let api: string = "https://emkc.org/api/v2/piston/execute";
	let data;
	if (language == "c" || language == "cpp") {
		api = "https://api.codex.jaagrav.in";
		data = {
			language: language,
			code: code,
			input: ex.input
		};
	} else {
		const ver: keyof typeof LANGUAGE_VERSIONS = language;
		data = {
			language: language,
			version: LANGUAGE_VERSIONS[ver],
			files: [
				{
					content: code,
				}
			],
			stdin: ex.input
		};
	}

	const response = await fetch(api, {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}).then(res => res.json());

	if (language == 'c' || language == 'cpp') {
		if (response.output !== "") {
			return { status: 201, message: response.output }
		} else if (response.error !== "") {
			return { status: 402, message: response.error }
		}
		else {
			return { status: 403, message: "Error While Fetching Data" } // server fetching error
		}
	}
	else {
		if (response.message) {
			return { status: 401, message: response.message } // version err
		} else if (response.run) {
			if (response.run.stderr != "") {
				return { status: 402, message: response.run.stderr } // compilation err
			} else if (response.run.output != "") {
				return { status: 201, message: response.run.output } // success
			}
			else {
				return { status: 201, message: response.run.output }
			}
		} else {
			return { status: 403, message: "Error While Fetching Data" } // server fetching error
		}
	}
}
