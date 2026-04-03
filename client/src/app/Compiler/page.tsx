'use client'
import React, { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";

const CompilerQue = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [content, setContent] = useState('');
    const [outputVisible, setOutputVisible] = useState(false);
    const [outputHeight, setOutputHeight] = useState(192); // Initial height for the output box
    const [userLang, setUserLang] = useState("python");
    const [output, setOutput] = useState("");

    const handleRun = async () => {
        let res:any = await fetch('/api/compiler/1', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({  
                language: userLang, code: content,
            })
        });

        const response = await res.json();
        console.error(response);
        if(response.message!=null)
            {
            setOutput("server error occured while running your code! Sorry.\n Error : " + response.message);
                return null;
            }
        if (response.run.stderr!="") {
            setOutput(response.run.output); // Assume the response has an 'output' field
        }
        else {
            setOutput(response.run.output);
        }
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
                                <a href="#" className="text-white"><i className="fa fa-list me-2" aria-hidden="true"></i>Problem List</a>
                                <a href="#" className="text-white text-xl"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                                <a href="#" className="text-white text-xl"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
                            </div>
                            <div className="flex-grow flex justify-center">
                                <button className="text-white bg-[#222222] px-3 py-1 rounded-sm me-1" onClick={handleRun}><i className="fa fa-play me-2"></i>Run</button>
                                <a href="#" className="text-[#3fb950] bg-[#222222] px-3 py-1 rounded-sm">
                                    <i className="fa fa-cloud-upload me-2"></i>Submit</a>
                            </div>
                            <div className="flex space-x-4">
                                <a href="#" className="text-white"><i className="fa fa-cog" aria-hidden="true"></i></a>
                                <a href="#" className="text-white"><i className='fa fa-user-circle'></i></a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className='flex'>
                    <div className='my-3 w-[50%] h-[90vh] bg-[#262626] me-2 rounded-md'>
                        <div className='flex bg-[#333333] rounded-t-md py-2 ps-2 text-[#e1e1e1]'>
                            <h3 className='border-r-2 px-2 border-gray-600'><i className="px-2 fa fa-file-text text-[#33b3ae]" aria-hidden="true"></i>Description</h3>
                            <h3 className='border-r-2 px-2 border-gray-600'><i className="px-2 fa fa-book text-[#33b3ae]"></i>Editorial</h3>
                            <h3 className='border-r-2 px-2 border-gray-600'><i className="px-2 fa fa-flask text-[#33b3ae]" aria-hidden="true"></i>Solutions</h3>
                            <h3 className='px-2'><i className="px-2 fa fa-clock-o text-[#33b3ae]"></i>Submissions</h3>
                        </div>
                    </div>
                    <div className='my-3 w-[50%] h-[90vh] bg-[#262626] rounded-md'>
                        <div className='flex bg-[#333333] rounded-t-md py-2 ps-2'>
                            <h3 className='px-2 text-[#e1e1e1]'>
                                <i className="fa fa-code me-2 text-[#3fb950]"></i>Code</h3>
                        </div>
                        <nav className="bg-transparent border-b-2 border-gray-500">
                            <div>
                                <div className="relative">
                                    <select className='text-white bg-[#333333] text-base outline-0' onChange={(e) => setUserLang(e.target.value)}>
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
                                        <option value="python" selected>Python</option>
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
                                <pre className="p-5">{output}</pre>
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
