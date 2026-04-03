"use client";
import Navbar from '@/components/Navbar';
import React, { useEffect, useState, useRef } from 'react';
import '../../css/Problemset.css';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Problemset = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
        setIsOpen1(false)
        setIsOpen2(false)
    };
    const toggleDropdown1 = () => {
        setIsOpen1(!isOpen1)
        setIsOpen(false)
        setIsOpen2(false)
    };
    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2)
        setIsOpen(false)
        setIsOpen1(false)
    };

    const handleClickOutside = (event:any) => {
        if (!event.target.closest('.dropdown')) {
            setIsOpen(false);
            setIsOpen1(false);
            setIsOpen2(false);
        }
    };

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredArr, setFilteredArr] = useState([]);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        fetchProblems();
        setLoading(true);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    const [user, setUser] = useState({ solvedQuestion: [] });

    useEffect(() => {
        checkUser();
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await fetch('/api/problem');
            if (!response.ok) {
                throw new Error('Failed to fetch problems');
            }
            const data = await response.json();
            setProblems(data.allProblems);
            setFilteredArr(data.allProblems); // Initialize filteredArr
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const checkUser = async () => {
        const data = await fetch('/api/user/checkuser');
        const res = await data.json();

        if (res.success) {
            setUser(res.data);
        }
    }

    const chooseRandom = async () => {
        let n = Math.floor((Math.random() * (problems.length - 1)));
        //
        if (n >= 0 && n < problems.length) {
            let problem:any = problems[n];
            if (user.solvedQuestion.includes(problem?._id)) {
                chooseRandom();
            }else{
                router.push("/Compiler/" + problem.problem_id);
            }
        } else {
            chooseRandom();
        }
    }

    const filtering = (by: string, value: string) => {

        let filtered = [];
        switch (by) {
            case 'difficulty':
                filtered = problems.filter((problem:any) => problem.level === value);
                break;
            case 'category':
                filtered = problems.filter((problem:any) => problem.category.includes(value));
                break;
            case 'status':
                if (value == 'solved') {
                    filtered = problems.filter((problem:any) => user.solvedQuestion.includes(problem._id))
                } else {
                    filtered = problems.filter((problem:any)=> !(user.solvedQuestion.includes(problem._id)))
                }
                break;
            default:
                filtered = problems;
        }
        setFilteredArr(filtered);
    }

    const searchProblem = (title: any) => {
        let filtered = [];
        if (title) {
            filtered = problems.filter(problem => problem.problem_title.toLowerCase().includes(title.toLowerCase()))
        }
        else {
            filtered = problems;
        }
        setFilteredArr(filtered);
    }

    const clearFilter = () => {
        setFilteredArr(problems);
    }
    if (error) return <div className='bg-red-700 text-white'>Error: {error}</div>;

    // const topics = [
    //     { name: 'All Topics', icon: 'fa fa-tasks', color: 'gray' },
    //     { name: 'Algorithm', icon: 'fa fa-sitemap', color: 'yellow-600' },
    //     { name: 'Database', icon: 'fa fa-database', color: 'blue-600' },
    //     { name: 'JavaScript', icon: 'fa-brands fa-square-js', color: 'cyan-500' },
    //     { name: 'Pandas', icon: 'fa-brands fa-python', color: 'violet-600' },
    // ];

    return (
        <>
            <div>
                <Navbar />
                <div className='flex flex-col mx-auto w-screen p-5'>
                    {/* <div className='flex flex-wrap mb-3'>
                        {
                            topics.map((item, index) => {
                                return (
                                    <div key={index} className='text-custom-white mx-2 px-4 py-2 bg-custom-gray3 rounded-full'><span className={`text-${item.color}`}><i className={`${item.icon} me-2`}></i></span>{item.name}</div>
                                )
                            })
                        }
                    </div> */}
                    <div className='flex flex-wrap text-custom-white mb-5'>
                        <div className='relative inline-block'>
                            <div className='mx-2 px-3 py-1 bg-custom-gray3 rounded-md' style={{ cursor: "pointer" }} onClick={toggleDropdown}>Difficulty<span className='text-xl'><i className="fa fa-angle-down ms-3"></i></span></div>
                            {isOpen && (
                                <div className="dropdown absolute ms-2 mt-2 py-2 w-44 bg-[#2a2a2a] rounded-md shadow-lg" onClick={toggleDropdown}>
                                    <a href="#" className="block px-4 py-2 text-green-500 hover:bg-gray-200" onClick={() => filtering('difficulty', 'easy')}>Easy</a>
                                    <a href="#" className="block px-4 py-2 text-yellow-500 hover:bg-gray-200" onClick={() => filtering('difficulty', 'medium')}>Medium</a>
                                    <a href="#" className="block px-4 py-2 text-red-500 hover:bg-gray-200" onClick={() => filtering('difficulty', 'hard')}>Hard</a>
                                </div>
                            )}
                        </div>
                        <div className=' relative inline-block'>
                            <div className='mx-3 px-3 py-1 bg-custom-gray3 rounded-md' style={{ cursor: "pointer" }} onClick={toggleDropdown1}>Category<span className='text-xl'><i className="fa fa-angle-down ms-3"></i></span></div>
                            {isOpen1 && (
                                <div className="dropdown absolute ms-2 mt-2 py-2 w-44 bg-[#2a2a2a] rounded-md shadow-lg" onClick={toggleDropdown1}>
                                    <a href="#" className="block px-4 py-2 text-green-500 hover:bg-slate-700 " onClick={() => filtering('category', 'greedy')}>Greedy</a>
                                    <a href="#" className="block px-4 py-2 text-green-500 hover:bg-slate-700" onClick={() => filtering('category', 'brute force')}>Brute Force</a>
                                    <a href="#" className="block px-4 py-2 text-green-500 hover:bg-slate-700" onClick={() => filtering('category', 'math')}>Math</a>
                                    <a href="#" className="block px-4 py-2 text-green-500 hover:bg-slate-700" onClick={() => filtering('category', 'implementation')}>Implementation</a>
                                    <a href="#" className="block px-4 py-2 text-green-500 hover:bg-slate-700" onClick={() => filtering('category', 'string')}>String</a>
                                </div>
                            )}
                        </div>
                        <div className='relative inline-block'>
                            <div className='mx-2 px-3 py-1 bg-custom-gray3 rounded-md' style={{ cursor: "pointer" }} onClick={toggleDropdown2}>Status<span className='text-xl'><i className="fa fa-angle-down ms-3"></i></span></div>
                            {isOpen2 && (
                                <div className="dropdown absolute ms-2 mt-2 py-2 w-44 bg-[#2a2a2a] rounded-md shadow-lg" onClick={toggleDropdown2}>
                                    <a href="#" className="block px-4 py-2 text-green-600 hover:bg-slate-700" onClick={() => filtering('status', 'solved')}>Solved</a>
                                    <a href="#" className="block px-4 py-2 text-green-600 hover:bg-slate-700" onClick={() => filtering('status', 'unsolved')}>Unsolved</a>
                                </div>
                            )}
                        </div>
                        <div className='bg-custom-gray3 rounded-lg px-3 ms-3'>
                            <i className='fa fa-search'></i>
                            <input type='text' className='bg-custom-gray3 rounded-md h-9 outline-none w-64' placeholder='Search Question' onChange={(e) => {
                                searchProblem(e.target.value);
                            }} />
                        </div>
                        <div className='ms-5 flex cursor-pointer' onClick={chooseRandom}>
                            <i className="fa fa-random bg-green-600 px-3 py-3 rounded-full" aria-hidden="true"></i>
                            <div className='mt-2 ms-1 text-green-600'>Pick One</div>
                        </div>
                        <div className='ms-5 flex cursor-pointer' onClick={clearFilter}>
                            <i className="fa fa-window-close bg-red-600 px-3 py-3 rounded-full" aria-hidden="true"></i>
                            <div className='mt-2 ms-1 text-red-600'>Clear Filter</div>
                        </div>
                    </div>
                    <div className='ms-2 text-custom-white'>
                        <table className='w-[100%]'>
                            <thead>
                                <tr>
                                    <th className='text-center'>Sr.no</th>
                                    <th>Problem Name</th>
                                    <th>Status</th>
                                    <th>Difficulty</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            {loading ?
                                <tbody className='ms-2'>{
                                    [...Array(10)].map((_, index: any) => (
                                        <tr key={index} className={index % 2 != 0 ? 'bg-custom-gray3' : 'bg-black'}>
                                            <td colSpan={4} className='w-[100%] text-center'><Skeleton baseColor='#00101f' count={1} className="skeleton-beat" /></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                :
                                <tbody className='ms-2'>
                                    {filteredArr.length > 0 ? (
                                        filteredArr.map((problem: any, index) => (
                                            <tr key={index} className={index % 2 != 0 ? 'bg-custom-gray3' : 'bg-black'} onClick={() => { router.push("/Compiler/" + problem.problem_id) }}>
                                                <td className='w-[8%] text-center text-white cursor-pointer'>{problem.problem_id}</td>
                                                <td className='text-white' style={{cursor:"pointer"}}>{problem.problem_title}</td>
                                                <td className='ps-5 text-green-700'><i className="fa fa-check-circle" aria-hidden="true"></i></td>
                                                <td className={problem.level === 'hard' ? 'text-red-700' : problem.level === 'medium' ? "text-yellow-500" : "text-green-500"}>{problem.level}</td>
                                                <td>{problem.category.map((c: any, index: any) => {
                                                    if (index === problem.category.length - 1) {
                                                        return c;
                                                    } else {
                                                        return c + ", ";
                                                    }
                                                })}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className='text-center text-white'>No problems found</td>
                                        </tr>
                                    )}
                                </tbody>}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Problemset;