"use client";
import Image from "next/image";
import { Tabs } from "./ui/tabs";
import polygon1 from '../../public/assets/images/Polygon 1.png'

export function Compiler() {
    const tabs = [
        {
            title: "C",
            value: "C",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl px-10 pt-7 pb-10  bg-[#7341c8]">
                    <p className="text-xl md:text-4xl font-bold text-white">Let's Start Code in C!</p>
                    <DummyContentC />
                </div>
            ),
        },
        {
            title: "C++",
            value: "C++",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl px-10 pt-7 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white ">Let's Start Code in C++</p>
                    <DummyContentCpp />
                </div>
            ),
        },
        {
            title: "Java",
            value: "Java",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl px-10 pt-7  bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white">Let's Start Code in Java</p>
                    <DummyContentJava />
                </div>
            ),
        },
        {
            title: "Python",
            value: "Python",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl px-10 pt-7 bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-xl md:text-4xl font-bold text-white">Let's Start Code in Python</p>
                    <DummyContentPython />
                </div>
            ),
        },
        // {
        //     title: "JavaScript",
        //     value: "JavaScript",
        //     content: (
        //         <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#7341c8] to-violet-900">
        //             <p>Random tab</p>
        //             <DummyContent />
        //         </div>
        //     ),
        // },
    ];

    return (
        <>
            <svg width="850" height="850" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="-mt-48 -ms-60">
                {/* <!-- Central point --> */}
                <circle cx="100" cy="100" r="2" fill="black" />

                {/* <!-- First orbit --> */}
                <circle cx="100" cy="100" r="50" fill="none" stroke="#27272a" />
                {/* <!-- Dot on the first orbit --> */}
                <circle cx="150" cy="100" r="5" fill="#27272a">
                    <animateTransform attributeName="transform"
                        type="rotate"
                        from="0 100 100"
                        to="360 100 100"
                        dur="15s"
                        repeatCount="indefinite" />
                </circle>

                {/* <!-- Second orbit --> */}
                <circle cx="100" cy="100" r="30" fill="none" stroke="#27272a" />
                {/* <!-- Dot on the second orbit --> */}
                <circle cx="130" cy="100" r="3" fill="#27272a">
                    <animateTransform attributeName="transform"
                        type="rotate"
                        from="0 100 100"
                        to="360 100 100"
                        dur="10s"
                        repeatCount="indefinite" />
                </circle>

                {/* <!-- Third orbit --> */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#27272a" />
                {/* <!-- Dot on the third orbit --> */}
                <circle cx="170" cy="100" r="4" fill="#27272a">
                    <animateTransform attributeName="transform"
                        type="rotate"
                        from="0 100 100"
                        to="360 100 100"
                        dur="20s"
                        repeatCount="indefinite" />
                </circle>
            </svg>

        <div className=" pb-20 h-[28rem] md:h-[48rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start -mt-[500px]">
            <Tabs tabs={tabs} />
        </div>
        </>
    );
}

const DummyContentC = () => {
    const defaultCode = `#include <stdio.h>\n\nint main() {\n    // Print a message to the console\n    printf("Hello, World!\\n");\n    return 0;\n}`;
    return (
        <div>
            <div className="container">
                <textarea
                    className="w-full bg-black rounded-md text-custom-white mt-7 focus:outline-none p-1"
                    defaultValue={defaultCode}
                    spellCheck="false"
                    style={{height:"70vh", letterSpacing:"1px"}}
                ></textarea>
            </div>
        </div >
    );
};

const DummyContentCpp = () => {
    const defaultCode = `#include <iostream>
    int main() {
        // Print a message to the console
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }`;
    return (
        <div>
            <div className="container">
                <textarea
                    className="w-full bg-black rounded-md text-custom-white mt-7 focus:outline-none p-1"
                    defaultValue={defaultCode}
                    spellCheck="false"
                    style={{ height: "70vh", letterSpacing: "1px" }}
                ></textarea>
            </div>
        </div >
    );
};

const DummyContentJava = () => {
    const defaultJavaCode = `public class HelloWorld {
    public static void main(String[] args) {
        // Print a message to the console
        System.out.println("Hello, World!");
    }
}`;
    return (
        <div>
            <div className="container">
                <textarea
                    className="w-full bg-black rounded-md text-custom-white mt-7 focus:outline-none p-1"
                    defaultValue={defaultJavaCode}
                    spellCheck="false"
                    style={{ height: "70vh", letterSpacing: "1px" }}
                ></textarea>
            </div>
        </div >
    );
};

const DummyContentPython = () => {
    const defaultPythonCode = `# Print a message to the console
print("Hello, World!")
`;
    return (
        <div>
            <div className="container">
                <textarea
                    className="w-full bg-black rounded-md text-custom-white mt-7 focus:outline-none p-1"
                    defaultValue={defaultPythonCode}
                    spellCheck="false"
                    style={{  letterSpacing: "1px" }}
                ></textarea>
            </div>
        </div >
    );
};