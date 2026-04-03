"use client";
import React from 'react';
import { useEffect, useRef, useState } from 'react'
import logo from '../../public/assets/images/logo.png'
import Image from 'next/image';
import '../css/Navbar.css';
import Link from 'next/link';

export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [user, setUser] = useState({ username: '', email: '' });

    useEffect(() => {
        checkUser();
    }, [])

    const checkUser = async () => {
        const data = await fetch('/api/user/checkuser');
        const res = await data.json();

        if (res.success) {
            setUser({ ...user, email: res.data.email, username: res.data.username });
        }
    }

    const logOutUser = async () => {
        const data = await fetch('/api/user/logout');
        const res = await data.json();
        if (res.success) {
            setUser({ email: '', username: '' });
        }
    }

    const handleNavItemClick = (index: any, element: any) => {
        if (element == 'Logout') {
            logOutUser();
        }
        setActiveIndex(index);
    };

    const navItems = [
        { name: 'Home', icon: 'fa fa-home', href: '/' },
        { name: 'Dashboard', icon: 'fa fa-tachometer', href: `/${user.email ? user.username : null}` },
        { name: 'Playground', icon: 'fa-solid fa-keyboard', href: '/CodeEditor' },
        { name: 'Problemset', icon: 'fa fa-list', href: '/problemset' },
        { name: user.email ? 'Logout' : 'Login', icon: 'fa fa-sign-in', href: user.email ? '' : '/signup' },
        { name: user.email ? '' : 'Signup', icon: user.email ? '' : 'fa fa-user', href: user.email ? '' : '/signup' },
    ];

    return (
        <>
            <nav className="relative">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <div className='flex bg-black'>
                        <Image src={logo} width={75} height={75} className='' alt='logo'></Image>
                        <Link className="text-white text-2xl font-bold mt-3 ms-2" href={"/"}>
                            DevSkill Builder
                        </Link>
                    </div>

                    <div className=" w-full lg:flex lg:items-center lg:w-auto hidden" id="navbarSupportedContent">
                        <ul className="flex flex-col lg:flex-row lg:ml-auto lg:items-center relative">
                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="nav-item "
                                    onClick={() => handleNavItemClick(index, item.name)}
                                >
                                    <Link
                                        className={`flex items-center p-2 transition-colors duration-300 ${activeIndex === index
                                            ? 'text-white active rounded-t-2xl'
                                            : 'text-gray-400 hover:text-[#7341c8]'
                                            }`}
                                        href={item.href}
                                    >
                                        <i className={`${item.icon} mr-2`}></i>
                                        <span className='hover:text-[#7341e8]'>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
