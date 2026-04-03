import { NextResponse } from "next/server";
import { LANGUAGE_VERSIONS } from "@/app/constants";
import ProblemModel from '@/model/Problem';
import UserModel from '@/model/User';
import dbConnect from "@/lib/dbConnect";
import { setTimeout as sleep } from "timers/promises";


export async function POST(req: Request) {
	let { code, language,input } = await req.json();

	await dbConnect();

    const data = await callapi(language, code,input);

    if (data) {
			if (data.status == 201) {
				data.message = data.message.replace("\n", "");
				return NextResponse.json({ status: 200, message: data.message });
			}
			else {
				if (data.status == 401) {
					return NextResponse.json({ status: 401, error: data.message, message: "" });
				} else if (data.status == 402) {
					return NextResponse.json({ status: 402, error: data.message, message: "" });
				} else if (data.status == 403) {
					return NextResponse.json({ status: 403, error: "Error While Fetching Data", message: "" });
				}else if(data.status == 500){
                    return NextResponse.json({ status: 500, error: "Internal Server Error", message: "" });
                }
			}
	}
    return NextResponse.json({ status: 500, error: "Internal Server Error", message: "" });
}

const callapi = async (language: string, code: string, input:string) => {
	let api: string = "https://emkc.org/api/v2/piston/execute";
	let data;
	if (language == "c" || language == "cpp") {
		api = "https://api.codex.jaagrav.in";
		data = {
			language: language,
			code: code,
			input: input
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
			stdin: input
		};
	}

	const response = await fetch(api, {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}).then(res => res.json());

    if(response.status == 500){
        return { status: 500, message: "Internal Server Error" }
    }
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