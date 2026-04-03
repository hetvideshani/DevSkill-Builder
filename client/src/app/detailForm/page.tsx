'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../../css/DetailForm.css';
import IconStrip from '@/components/IconStrip';

const DetailForm = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
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
        registered_date: new Date(),
        streak: [],
        friends: [],
        social_media: {
            portfolio: "",
            linkedin: "",
            github: "",
            other: ""
        },
        address: {
            city: "",
            country: "",
        },
        miscellaneous: {
            companyName: " ",
            user_language: "",
            college: ""
        },
        verified: {
            expiry_date: new Date(),
            isVerified: false
        },
        languages: [""],
        solvedQuestion: [],
        notifications: null,
        history: []
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const programmingLanguages = [
        'JavaScript',
        'Python',
        'Java',
        'C#',
        'C++',
        'Ruby',
        'Swift',
        'PHP',
        'TypeScript',
        'Go',
        'Rust',
        'Kotlin',
        'Scala',
        'Perl',
        'HTML/CSS',
        'R',
        'MATLAB',
        'Objective-C',
        'Assembly',
        'VB.NET',
        'Lua',
        'Haskell',
        'Dart',
        'F#',
        'Groovy',
        'PowerShell',
        'Shell Scripting',
        'Clojure',
        'Elixir',
        'Julia',
        'Scheme'
    ];

    const [languageArray, setLanguageArray] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        let u = await fetch("/api/user/checkuser");
        let result = await u.json();
        setUser(result.data);
        
        setLanguageArray(result.data.languages);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLanguage(e.target.value);
    };

    const handleButtonClick = () => {
        if (selectedLanguage.trim() !== '') {
            if (languageArray.length == 5) {
                return;
            }
            if (languageArray.includes(selectedLanguage)) {
                return;
            }
            setLanguageArray([...languageArray, selectedLanguage]);
        }
    };
    function validateUrl(url: string) {
        if (url === "") {
            return true;
        }
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        const isValidUrl = urlRegex.test(url);
        return isValidUrl;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!validateUrl(user.social_media.portfolio)) {
        //     return;
        // }
        // if (!validateSocialMediaUrl(user.social_media.linkedin)) {
        //     return;
        // }
        // if (!validateSocialMediaUrl(user.social_media.github)) {
        //     return;
        // }
        // if (!validateUrl(user.social_media.other)) {
        //     return;
        // }

        user.languages = languageArray;

        const res = await fetch('/api/user/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        let result = await res.json();
        if (result.success) {
            router.push(`/${user.username}`);
        }
    };

    const deleteLang = (index: number) => {
        languageArray.splice(index, 1);
        setLanguageArray([...languageArray]);
    };

    const validateSocialMediaUrl = (url: string) => {
        if (url === "") {
            return true;
        }
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+(\/)?$/;
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-]+(\/)?$/;

        const isGitHubUrl = githubRegex.test(url);
        const isLinkedInUrl = linkedinRegex.test(url);

        return isGitHubUrl || isLinkedInUrl;
    }

    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || "";
        if (value.length <= 400) {
            setUser({ ...user, description: value });
        }
        else {
            let s = value.slice(0, 400);
            setUser({ ...user, description: s });
        }
    };

    const handleFileSubmit = async (event: any) => {
        event.preventDefault();
        
        if (!file) {
            setMessage('No file selected');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            setMessage('Invalid file type');
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setMessage('File too large');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/user/upload-user-image', {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            setMessage(result.message);
            let index = result.filePath.indexOf('avatar');
            let fileLocation = result.filePath.substring(index + 7);
            setUser({ ...user, image: fileLocation });
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('An error occurred during file upload');
        }
    };

    return (
        <>
            <div className='flex flex-col md:flex-row'>
                <div className='grid w-full md:w-[85%] text-custom-white'>
                    <form className='ms-6 md:ms-24 pt-5' onSubmit={handleSubmit}>
                        <div className='mb-10 flex justify-center'>
                            <h1 className='text-gray-400 font-extrabold text-4xl'>
                                <span className="border-b-2 pb-2">DevDetails Submission Portal</span>
                            </h1>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <div className='flex border-b border-custom-white w-full md:w-1/4 px-1 me-10 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-user"></i></label>
                                <input
                                    type='text'
                                    className='block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent w-full cursor-not-allowed'
                                    placeholder='Your Name'
                                    value={user.username}
                                    disabled
                                />
                            </div>
                            <div className='flex border-b border-custom-white w-full md:w-3/4 px-1'>
                                <label className='mt-1 me-5'><i className="fa fa-info-circle" aria-hidden="true"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Your Bio'
                                    value={user.description}
                                    onChange={(e) => {
                                        setUser({ ...user, description: e.target.value });
                                        handleBioChange(e);
                                    }}
                                />
                                <span className='flex items-end'>{user.description.length}/400</span>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row mt-10'>
                            <div className='flex border-b border-custom-white w-full md:w-[33%] px-1 me-10 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-building-o"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Company'
                                    // value={user.miscellaneous.companyName}
                                    onChange={(e) => setUser({ ...user, miscellaneous: { ...user.miscellaneous, companyName: e.target.value } })}
                                />

                            </div>
                            <div className='flex border-b border-custom-white w-full md:w-[33%] px-1 me-10 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-map-marker" aria-hidden="true"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='City'
                                    value={user.address.city}
                                    onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                                />
                            </div>
                            <div className='flex border-b border-custom-white w-full md:w-[33%] px-1 me-10 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-globe" aria-hidden="true"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Country'
                                    value={user.address.country}
                                    onChange={(e) => setUser({ ...user, address: { ...user.address, country: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div className='flex mt-10'>
                            <div className='flex border-b border-custom-white w-1/2 px-1 me-10'>
                                <label className='mt-1 me-5'><i className="fa fa-university" aria-hidden="true"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='College/University'
                                    // value={user.miscellaneous.college}
                                    onChange={(e) => setUser({ ...user, miscellaneous: { ...user.miscellaneous, college: e.target.value } })}
                                />
                            </div>
                            <div className='flex border-b border-custom-white w-full md:w-1/3 px-1 me-3 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-image"></i></label>
                                <input
                                    type='file'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <button className='bg-slate-600 px-5 py-2 rounded-md' onClick={handleFileSubmit}>Upload</button>
                                <h3>{message == "" ? null : message}</h3>
                            </div>
                        </div>
                        <div className='flex mt-10'>
                            <div className='flex border-b border-custom-white w-full px-1 me-10'>
                                <label className='mt-1 me-5'><i className="fa fa-user"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Your Portfolio Website'
                                    value={user.social_media.portfolio}
                                    onChange={(e) => setUser({ ...user, social_media: { ...user.social_media, portfolio: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row mt-10'>
                            <div className='flex border-b border-custom-white w-full md:w-1/3 px-1 me-5 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-linkedin"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Linkedin Link'
                                    value={user.social_media.linkedin}
                                    onChange={(e) => setUser({ ...user, social_media: { ...user.social_media, linkedin: e.target.value } })}
                                />
                            </div>
                            <div className='flex border-b border-custom-white w-full md:w-1/3 px-1 me-5 mb-4 md:mb-0'>
                                <label className='mt-1 me-5'><i className="fa fa-github" aria-hidden="true"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Github Link'
                                    value={user.social_media.github}
                                    onChange={(e) => setUser({ ...user, social_media: { ...user.social_media, github: e.target.value } })}
                                />
                            </div>
                            <div className='flex border-b border-custom-white w-full md:w-1/3 px-1'>
                                <label className='mt-1 me-5'><i className="fa fa-link" aria-hidden="true"></i></label>
                                <input
                                    type='text'
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-transparent'
                                    placeholder='Other Link'
                                    value={user.social_media.other}
                                    onChange={(e) => setUser({ ...user, social_media: { ...user.social_media, other: e.target.value } })}

                                />
                            </div>
                        </div>
                        <div className='flex mt-10'>
                            <div className='flex border-b border-custom-white w-full md:w-1/4 px-1 me-10'>
                                <label className='mt-1 me-5'><i className="fa fa-language" aria-hidden="true"></i></label>
                                <select
                                    className='w-full block px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 bg-black text-white'
                                    value={selectedLanguage}
                                    onChange={(e: any) => handleInputChange(e)}
                                >
                                    <option value='' disabled className='text-gray-400'>Select a language</option>
                                    {programmingLanguages.map((language, index) => (
                                        <option key={index} value={language}>{language}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='bg-slate-600 pt-2 px-5 rounded-md cursor-pointer' onClick={handleButtonClick}>Add</div>
                            <span className='ml-2 flex items-end'>{languageArray.length} / 5</span>
                        </div>
                        <div className='flex flex-wrap mt-5'>
                            {languageArray.map((item, index) => (
                                <div key={index} className='flex items-center mx-2 mb-2'>
                                    <div className='px-4 pl-3 py-[6px] bg-slate-700 rounded-md mr-2 relative'>
                                        {item}
                                        <button
                                            type='button'
                                            className='absolute top-0 right-0 -mt-1 -mr-1 text-xs text-gray-300 hover:text-gray-400 focus:outline-none'
                                            onClick={() => deleteLang(index)}
                                        >
                                            <i className="fa fa-times -translate-x-[8px] translate-y-[5px] ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-end mt-10'>
                            <button type='submit' className='bg-slate-500 px-6 py-3 rounded-md text-white'>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="flex w-full md:w-[15%] overflow-hidden h-[100vh]">
                    <IconStrip />
                </div>
            </div>
        </>
    );
};

export default DetailForm;
