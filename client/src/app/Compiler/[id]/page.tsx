'use client'
import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { global_email } from '../../globals';
import Link from 'next/link';

//thai to gyu
//ha ha joyu me ee

const CompilerQue = ({ params }: any) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [content, setContent] = useState('');
	const [outputVisible, setOutputVisible] = useState(false);
	const [outputHeight, setOutputHeight] = useState(192); // Initial height for the output box
	const [userLang, setUserLang] = useState("python");
	const [output, setOutput] = useState("");
	const [problemid, setProblemId] = useState("");
	const [submit, setSubmit] = useState(false);
	const [email, setEmail] = useState("");
	const [user, setUser] = useState({ email: "", username:"" });
	const [param, setParam] = useState(0);


	const item = {
		input: "",
		output: ""
	}
	const [problem, setProblem] = useState({
		_id: "",
		problem_id: "",
		problem_title: "",
		time_limit: "",
		max_memory: "",
		problem_statement: "",
		input_statement: "",
		output_statement: "",
		examples: [item],
		level: "",
		category: []
	});

	useEffect(() => {
		setEmail(global_email);
		if (params.id) {
			setProblemId(params.id);
			setParam(params.id)
		}
	}, [params.id]);

	useEffect(() => {
		if (problemid) {
			getProblem();
		}
	}, [problemid]);

	useEffect(() => {
		checkUser();
	}, [])

	const getProblem = async () => {
		const res = await fetch(`/api/problem/${problemid}`);
		const response = await res.json();
		setProblem(response.problem);
	}

	const checkUser = async () => {
		const data = await fetch('/api/user/checkuser');
		const res = await data.json();

		if (res.success) {
			setUser(res.data);
		}
	}

	const handleRun = async (check: any) => {
		let res = await fetch(`/api/compiler/${problemid}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				language: userLang, code: content, submit: check, email: user.email
			})
		});

		const response = await res.json();
		if (response.error) {
			if (response.status == 405) {
				setOutput("error occurred while running your code! Sorry.\n" + response.message + "\nTestcase : \n" + response.error.input + "\n" + response.error.output);
				return;
			}
			if (response.status == 406) {
				setOutput("User is not authenticate.\nPlease signup to run and submit code.")
				return;
			}
			setOutput("Error: " + response.error)
			return;
		}

		setOutput(response.message);

		setOutputVisible(true);
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		const startY = e.clientY;
		const startHeight = outputHeight;

		const handleMouseMove = (e: MouseEvent) => {
			const newHeight = startHeight + (startY - e.clientY);
			setOutputHeight(Math.min(Math.max(newHeight, 50), window.innerHeight * 0.79 - 50));
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleChange = (value: string | undefined) => {
		setContent(value || '');
	};

	return (
		<>
			<div>
				<div>
					<nav className="bg-transparent px-4 pt-3">
						<div className="container mx-auto flex justify-between items-center">
							<div className="flex space-x-4">
								<Link href="/problemset" className='text-custom-white'><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
								<Link href="/problemset" className="text-white"><i className="fa fa-list me-2" aria-hidden="true"></i>Problem List</Link>
								<Link href={param - 1 > 0 ? `/Compiler/${param - 1}` : '/problemset'} className="text-white text-xl"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
								<Link href={`/Compiler/${Number(param) + 1}`} className="text-white text-xl"><i className="fa fa-angle-right" aria-hidden="true"></i></Link>
							</div>
							<div className="flex-grow flex justify-center">
								<button className="text-white bg-[#222222] px-3 py-1 rounded-sm me-1" onClick={() => {
									setSubmit(false)
									setOutputVisible(true)
									setOutput("")
									handleRun(false)
								}}><i className="fa fa-play me-2"></i>Run</button>
								<a href="#" className="text-[#3fb950] bg-[#222222] px-3 py-1 rounded-sm" onClick={() => {
									setSubmit(true)
									setOutput("")
									setOutputVisible(true)
									handleRun(true)
								}}>
									<i className="fa fa-cloud-upload me-2"></i>Submit</a>
							</div>
							<div className="flex space-x-4">
								<a href={`/${user.username}`} className="text-white"><i className='fa fa-user-circle'></i></a>
							</div>
						</div>
					</nav>
				</div>
				<div className='flex'>
					<div className='ps-1 my-3 w-[50%] h-[90vh] bg-[#262626] me-2 rounded-md'>
						<div className='flex bg-[#333333] rounded-t-md py-2 ps-2 text-[#e1e1e1] cursor-pointer'>
							<h3 className='border-r-2 px-2 border-gray-600'>
								<i className="px-2 fa fa-file-text text-[#33b3ae]" aria-hidden="true"></i>Description
							</h3>
							<h3 className='border-r-2 px-2 border-gray-600'>
								<i className="px-2 fa fa-flask text-[#33b3ae]" aria-hidden="true"></i>Solutions
							</h3>
							<h3 className='px-2'>
								<i className="px-2 fa fa-clock-o text-[#33b3ae]"></i>Submissions
							</h3>
						</div>
						{problem.problem_id != "" ?
							<div className='bg-transparent w-full h-[83vh] text-white p-2 overflow-auto'>
								<h1 className='text-white font-bold p-1 text-xl md:text-xl lg:text-2xl xl:text-2xl'>{problem.problem_id + ". " + problem.problem_title}</h1>
								<div className='p-1 pt-2 flex justify-start flex-row'><p className={problem.level === "easy" ? "m-1 rounded-2xl font-medium border px-2 bg-[#333344] text-green-500" : problem.level === "medium" ? "m-1 rounded-2xl font-medium border px-2 bg-[#333344] text-yellow-500" : "m-1 rounded-2xl font-medium border px-2 bg-[#333344] text-red-500"}>{problem.level}</p>{problem.category.map((item: string) => {
									return <p className='m-1 rounded-2xl font-medium border px-2 bg-[#333344] text-yellow-500'>{item}</p>
								})}</div>
								<div className='mt-1 pl-2 leading-[1.35rem] text-[0.9rem]'>{problem.problem_statement}</div>
								<h2 className='mt-5 mb-1 text-xl ml-1 font-bold'>Input</h2>
								<p className='text-base border-l-2 border-gray-400 pl-2 leading-6'>{problem.input_statement}</p>
								<h2 className='mt-2 mb-1 text-xl ml-1 font-bold'>Output</h2>
								<p className='text-base border-l-2 border-gray-400 pl-2 leading-6'>{problem.output_statement}</p>
								<div className='flex flex-col mt-5'>{problem.examples.map((item, index) => {
									return index < 3 ? <div className='mt-3'><h2 className='text-xl ml-1'>Example {index + 1}</h2>
										<div className='border-l-2 border-gray-400'>
											<p className='ml-2'><span className='font-bold'>Input :</span><span className='text-gray-400 ml-2 text-base'>{item.input}</span></p>
											<p className='ml-2'><span className='font-bold'>Output :</span><span className='text-gray-400 ml-2 text-base'>{item.output}</span></p>
										</div>
									</div> : null;
								})}</div>
								<h2 className='mt-5 mb-1 text-xl ml-1 font-bold'>Constraints</h2>
								<p className='text-base border-l-2 border-gray-400 pl-2 leading-6'><span className='font-bold'>max memory :</span>
									<span className='text-gray-400'> {problem.max_memory}MB</span></p>
								<p className='text-base border-l-2 border-gray-400 pl-2 leading-6'><span className='font-bold'>Time Limit :</span>
									<span className='text-gray-400'> {problem.time_limit}s</span></p>
							</div> : null}
					</div>
					<div className='my-3 w-[50%] h-[90vh] bg-[#262626] rounded-md'>
						<div className='flex bg-[#333333] rounded-t-md py-2 ps-2'>
							<h3 className='px-2 text-[#e1e1e1]'>
								<i className="fa fa-code me-2 text-[#3fb950]"></i>Code
							</h3>
						</div>
						<nav className="bg-transparent border-b-2 border-gray-500">
							<div>
								<div className="relative">
									<select className='text-white bg-[#333333] text-base outline-0' onChange={(e) => setUserLang(e.target.value)} defaultValue={userLang} style={{ cursor: "pointer" }}>
										<option value="c">C</option>
										<option value="cpp">C++</option>
										<option value="csharp">C#</option>
										<option value="dart">Dart</option>
										<option value="go">GO</option>
										<option value="java">Java</option>
										<option value="javascript">Javascript</option>
										<option value="mysql">MySQL</option>
										<option value="objective-c">Objective-C</option>
										<option value="perl">Perl</option>
										<option value="php">php</option>
										<option value="python">Python</option>
										<option value="r">R</option>
										<option value="ruby">Ruby</option>
										<option value="rust">Rust</option>
										<option value="swift">Swift</option>
										<option value="typescript">Typescript</option>
									</select>
								</div>
							</div>
						</nav>
						<div className="flex overflow-hidden h-[79vh] rounded-b-md">
							<Editor
								theme={"vs-dark"}
								language={userLang}
								defaultValue="# Start Code From Here."
								value={content}
								onChange={handleChange}
								className="w-full p-2 pr-4 focus:outline-none overflow-auto resize-none bg-[#262626] text-[#e1e1e1] leading-relaxed"
							/>
						</div>
						{outputVisible && (
							<div
								className="absolute bottom-4 w-[50%] rounded-lg bg-[#262626] text-white bg-opacity-90 overflow-auto resize-y"
								style={{ height: `${outputHeight}px`, minHeight: '50px' }}
							>
								<div className='bg-[#333333] text-[#e1e1e1] w-[100%] p-2 rounded-t-2'>
									Output
								</div>
								<pre className="p-5">{output ? output : "Loading ..."}</pre>
								<div
									className="absolute top-0 w-full h-2 cursor-ns-resize"
									onMouseDown={handleMouseDown}
								></div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default CompilerQue;

