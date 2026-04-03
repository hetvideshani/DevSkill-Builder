import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProblemModel from "@/model/Problem";

export async function POST(request:any) {
    const { problem_id, problem_title, time_limit, max_memory, problem_statement, input_statement, output_statement, examples, level, category } = await request.json();
    await dbConnect();
    
    try {
        await ProblemModel.create({ problem_id, problem_title, time_limit, max_memory, problem_statement, input_statement, output_statement, examples, level, category });

        return NextResponse.json({ message: "Topic created" }, { status: 201 });
    } catch (error) {
        console.error("Error while entering problem ", error)
        return NextResponse.json({
            success: false,
            message: "Error while entering problem"
        }, { status: 500 })
    }
}

export async function GET()
{
	await dbConnect();
	try
	{
		const allProblems = await ProblemModel.find({});

		return NextResponse.json({allProblems},{status: 201});
	} catch (error) {
		console.error("Error while fetching problem data", error)
		return NextResponse.json({
			success: false,
			message: "Error while fetching problem data"
		}, { status: 500 })
	}
}


// const prob = {
//     "problem_id": 3,
//     "problem_title": "Phone Desktop",
//     "time_limit": 1,
//     "max_memory": 256,
//     "problem_statement": "Little Rosie has a phone with a desktop (or launcher, as it is also called). The desktop can consist of several screens. Each screen is represented as a grid of size 5x3, i.e., five rows and three columns. There are x applications with an icon size of 1x1 cells; such an icon occupies only one cell of the screen.There are also y applications with an icon size of 2x2 cells; such an icon occupies a square of 4 cells on the screen.Each cell of each screen can be occupied by no more than one icon. Rosie wants to place the application icons on the minimum number of screens.Help her find the minimum number of screens needed.",
//     "input_statement": "The first line of the input contains t(1≤t≤104) — the number of test cases. The first and only line of each test case contains two integers x and y(0≤x, y≤99) — the number of applications with a 1x1 icon and the number of applications with a 2x2 icon, respectively.",
// 	"output_statement": "For each test case, output the minimal number of required screens on a separate line.",
//     "examples": [
//         {
//             "input": "1 1",
//             "output": "1"
//         },
//         {
//             "input": "7 2",
//             "output": "1"
//         },
//         {
//             "input": "12 4",
//             "output": "2"
//         },
//         {
//             "input": "0 3",
//             "output": "2"
//         },
//         {
//             "input": "1 0",
//             "output": "1"
//         },
//         {
//             "input": "8 1",
//             "output": "1"
//         },
//         {
//             "input": "0 0",
//             "output": "0"
//         },
//         {
//             "input": "2 0",
//             "output": "1"
//         },
//         {
//             "input": "15 0",
//             "output": "1"
//         },
//         {
//             "input": "8 2",
//             "output": "2"
//         },
//         {
//             "input": "0 9",
//             "output": "5"
//         }
//     ],
//     "level": "medium",
//     "category": ["greedy","maths"]
// }
