'use client'
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileImage from '../../../public/assets/images/profile.jpg'
import { useState, useEffect, useRef } from 'react';
import '../../css/user.css';
import 'reactjs-popup/dist/index.css';
import Modal from "../../components/Modal";
import StreakBoard from '@/components/Streak';
import novice from '../../../public/assets/images/novice.png'
import proficient from '../../../public/assets/images/proficient.png'
import virtuoso from '../../../public/assets/images/virtuoso.png'
const Profile = ({ params }: any) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [bedge, setBedge] = useState(novice)
    const [defaultImage, setDefaultImage] = useState(profileImage); // Set your default image path here
    const [isOpen, setIsOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        dob: "",
        mobile_number: null,
        email: "",
        image: "",
        isOnline: null,
        description: "",
        registered_date: Date,
        streak: {
            date: [],
            longest_streak: 0
        },
        friends: [],
        social_media: {
            portfolio: "",
            linkedin: "",
            github: ""
        },
        address: {
            city: "",
            country: "",
        },
        verified: {
            expiry_date: Date,
            isVerified: Boolean
        },
        miscellaneous: {
            companyName: " ",
            user_language: "",
            college: ""
        },
        languages: [],
        solvedQuestion: [],
        notifications: null,
        history: []
    });
    const [topLanguages, setTopLanguages] = useState<{ language: string; count: number }[]>([]);
    const [problems, setProblems] = useState([{ _id: null, level: "" }])
    const [recentProblemSolved, setRecentProblemSolved] = useState([]);
    const [solved, setSolved] = useState({
        total: 0,
        easy: 0,
        medium: 0,
        hard: 0
    })
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        setProgress();
    }, [user]);

    const checkUser = async () => {
        try {
            const data = await fetch('/api/user/checkuser');
            const res = await data.json();

            if (res.success) {
                setUser(res.data);
                setRecentProblemSolved(res.data.history);
                setUploadedImage(res.data.image);
                setTopLanguages(findTopSolvedLanguages(res.data.history));
            } else {
                router.push('/signup');
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    const findTopSolvedLanguages = (history: any) => {
        const languageCount = history.reduce((acc:any, problem:any) => {
            if (problem.status === true) {
                acc[problem.language] = (acc[problem.language] || 0) + 1;
            }
            return acc;
        }, {});

        const sortedLanguages = Object.entries(languageCount)
            .map(([language, count]) => ({ language, count: count as number }))
            .sort((a:any, b:any) => b.count - a.count);

        const topLanguages = sortedLanguages.slice(0, 3);

        return topLanguages;
    }
    const fetchProblems = async () => {
        try {
            const response = await fetch('/api/problem');
            if (!response.ok) {
                throw new Error('Failed to fetch problems');
            }
            const data = await response.json();
            setProblems(data.allProblems);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const setProgress = async () => {
        await fetchProblems();
        let hard = 0, medium = 0, easy = 0

        user.solvedQuestion.forEach(pro => {
            problems.filter(original => original.level == "easy" && original._id == pro).length != 0 ? easy++ : ""
            problems.filter(original => original.level == "medium" && original._id == pro).length != 0 ? medium++ : ""
            problems.filter(original => original.level == "hard" && original._id == pro).length != 0 ? hard++ : ""
        })
        setSolved({
            ...solved, total: user.solvedQuestion.length, easy: easy, medium: medium, hard: hard
        })
        if (user.solvedQuestion.length > problems.length * 0.6) {
            setBedge(virtuoso)
        } else if (user.solvedQuestion.length > problems.length * 0.3) {
            setBedge(proficient)
        }
        
        setPercent(parseFloat((user.solvedQuestion.length * 100 / problems.length).toFixed(2)) || 0)
    }

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const handleUpdateImage = (file: any) => {
        setUploadedImage(URL.createObjectURL(file));
    }
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const circleRef = useRef<SVGCircleElement | null>(null);

    useEffect(() => {
        const circle = circleRef.current;
        if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = `${offset}`;
        }
    }, [percent]);

    const circumferenceColor = 'text-custom-green';

    return (
        <>
            <Navbar />
            <div className="flex gap-4 px-24">
                <div className="bg-custom-dark-gray w-1/4 p-4 rounded shadow text-center h-full justify-center items-center">
                    <div className='text-custom-white'>
                        <div className='flex flex-col items-center'>
                            {uploadedImage ? (
                                <div className='w-20 h-20 rounded-full overflow-hidden mb-3 flex items-center justify-center'>
                                    <Image
                                        src={`/assets/images/avatar/${uploadedImage}`}
                                        alt="Uploaded"
                                        className="uploaded object-cover"
                                        height="200"
                                        width="200"
                                        onError={() => setDefaultImage(profileImage)}
                                    />
                                </div>
                            ) : (
                                <div className='w-20 h-20 rounded-full overflow-hidden mb-3'>
                                    <Image
                                        src={defaultImage}
                                        className='w-full h-full object-cover'
                                        alt="profile"
                                        onError={() => setDefaultImage(profileImage)}
                                    />
                                </div>
                            )}

                            <div className='mb-2'>
                                <button className='text-[#06b6d4]' onClick={handleOpenModal}>Update Profile</button>
                            </div>
                            <Modal
                                isOpen={isOpen}
                                onClose={handleCloseModal}
                                onUpdateImage={handleUpdateImage}
                                user_email={user.email}
                            />
                        </div>
                        <p className='text-xl font-semibold'>{user.username}</p>
                        <p className='text-sm mb-3'>
                            <i className="fa fa-map-marker me-2" aria-hidden="true"></i>

                            {user.address.city ?? "City"}, {user.address.country ?? "Country"}
                        </p>

                        <div className='flex my-4 justify-between w-full'>
                            <div>
                                <h1 className='text-xs font-light'>Programs</h1>
                                <h1 className='text-cyan-500 font-bold text-xl'>{percent}</h1>
                            </div>
                            <div>
                                <h1 className='text-xs font-light'>Connections</h1>
                                <h1 className='text-cyan-500 font-bold text-xl'>643</h1>
                            </div>
                            <div>
                                <h1 className='text-xs font-light'>Following</h1>
                                <h1 className='text-cyan-500 font-bold text-xl'>76</h1>
                            </div>
                        </div>
                        <button className='bg-cyan-500 w-full py-1 rounded-md mb-3' onClick={toggleVisibility}>Edit Profile</button>
                        <div className={!isVisible ? 'block border-t-2 border-gray-500 text-left pt-3' : 'hidden'}>
                            <h1><i className="fa fa-info-circle me-3" aria-hidden="true"></i>{user.description}</h1>
                            <h1 className='mt-3'><i className="fa fa-building-o me-3" aria-hidden="true"></i>{user.miscellaneous.companyName}</h1>
                            <h1 className='mt-3'><i className="fa fa-map-marker me-3" aria-hidden="true"></i>{user.address.city ?? "City"}, {user.address.country ?? "Country"}</h1>
                            <h1 className='mt-3'><i className="fa fa-link me-3" aria-hidden="true"></i>{user.social_media.portfolio}</h1>
                        </div>
                        <form className={isVisible ? 'block text-left' : 'hidden'}>
                            <label className='block'>Name</label>
                            <input type='text' placeholder='Name' className='w-full bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            <label className='block'>Bio</label>
                            <input type='textarea' placeholder='Add a bio' className='w-full bg-transparent border border-gray-500 rounded-md h-16 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            <div>
                                <i className="fa fa-building-o me-3" aria-hidden="true"></i>
                                <input type='text' placeholder='Company' className='bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            </div>
                            <div>
                                <i className="fa fa-map-marker me-4" aria-hidden="true"></i>
                                <input type='text' placeholder='Location' className='bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            </div>
                            <div>
                                <i className="fa fa-link" aria-hidden="true"></i>
                                <input type='text' placeholder='Website' className='bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            </div>
                            <label className='block my-2'>Social accounts</label>
                            <div>
                                <i className="fa fa-link" aria-hidden="true"></i>
                                <input type='text' placeholder='Link to social profile' className='bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            </div>
                            <div>
                                <i className="fa fa-link" aria-hidden="true"></i>
                                <input type='text' placeholder='Link to social profile' className='bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            </div>
                            <div>
                                <i className="fa fa-link" aria-hidden="true"></i>
                                <input type='text' placeholder='Link to social profile' className='bg-transparent border border-gray-500 rounded-md h-8 px-2 mt-1 mb-2 outline-none text-xs'></input>
                            </div>
                            <div className='flex'>
                                <button className='bg-custom-green px-3 py-1 rounded-md me-3'>Save</button>
                                <button className='bg-custom-gray px-3 rounded-md'>Cancel</button>
                            </div>
                        </form>
                        <div className='border-t-2 border-gray-400 w-full text-left text-base font-medium pt-3 mt-4'>
                            <h1>Top Solved Languages</h1>
                            {topLanguages.map((item) => {
                                return <>
                                    <div className='flex justify-between overflow-hidden mt-3'>
                                        <h1 className='bg-[#3e3e3e] px-2 rounded-full text-sm grid place-items-center'>{item.language}</h1>
                                        <span className=''>
                                            <h1 className='mt-1 text-xs flex justify-center items-center'><span className='font-bold me-1'>{item.count}</span>problems solved</h1>
                                        </span>
                                    </div >
                                </>
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-3/4 flex flex-col gap-4 h-full text-left">
                    <div className="relative flex flex-grow gap-4 ">
                        <div className="bg-custom-dark-gray p-5 rounded shadow h-[30vh] w-1/2 flex justify-around ">
                            <div className='relative mt-2'>
                                <svg className="mb-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle
                                        className="text-gray-300"
                                        strokeWidth="4"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="48%"
                                        cx="50%"
                                        cy="50%"
                                    />
                                    <circle
                                        ref={circleRef}
                                        className={`progress-ring__circle ${circumferenceColor}`}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="48%"
                                        cx="50%"
                                        cy="50%"
                                    />
                                    <text
                                        x="50%"
                                        y="50%"
                                        fill='white'
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        className="text-xl text-white font-semibold"
                                    >
                                        {(solved.total / problems.length * 100).toFixed(2) || 0}%
                                    </text>

                                </svg>
                                <div className=''>
                                    <h1 className='text-custom-white'><span className='font-semibold text-lg '>{solved.total}/{problems.length}</span> solved</h1>
                                </div>
                            </div>
                            <div className='text-center'>
                                <div className='bg-[#464646] px-5 py-1 rounded-lg mb-3'>
                                    <h1 className='text-custom-blue font-semibold'>Easy</h1>
                                    <h1 className='text-custom-white text-sm'>{solved.easy}/{problems.filter(pro => pro.level == 'easy').length}</h1>
                                </div>
                                <div className='bg-[#464646] px-5 py-1 rounded-lg mb-3'>
                                    <h1 className='text-yellow-500 font-semibold'>Medium</h1>
                                    <h1 className='text-custom-white text-sm'>{solved.medium}/{problems.filter(pro => pro.level == 'medium').length}</h1>
                                </div>
                                <div className='bg-[#464646] px-5 py-1 rounded-lg'>
                                    <h1 className='text-red-600 font-semibold'>Hard</h1>
                                    <h1 className='text-custom-white text-sm'>{solved.hard}/{problems.filter(pro => pro.level == 'hard').length}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-custom-dark-gray p-4 rounded shadow h-[30vh] w-1/2 flex justify-center items-center">
                            <Image src={bedge} alt='bedge' className='w-1/2 h-full' />
                        </div>
                    </div>
                    <StreakBoard Dates={user.streak.date} />
                    <div className="p-4 rounded shadow flex-grow bg-[#282828]">
                        <h1 className='text-cyan-500 text-xl font-bold mb-2'>Problem Solved</h1>
                        <div className='text-custom-white'>
                            {recentProblemSolved.map((obj: any, idx) => {
                                if (obj.status) {
                                    return (
                                        <div className='mb-1 px-2 py-[7px] rounded-lg' style={{ backgroundColor: idx % 2 == 0 ? '#282828' : '#393939' }}>
                                            <h1>{obj.problem_title}</h1>
                                            <h1 className='ms-2 font-light text-sm'>{obj.language}</h1>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;