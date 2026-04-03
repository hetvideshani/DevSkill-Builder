"use client"
import React, { useEffect, useState } from 'react';
import '../css/Footer.css';
import Image from 'next/image';
import logo from '../../public/assets/images/logo.png'

export default function Footer() {
    const [user, setUser] = useState<{ email: string, notifications: boolean }>({ email: '', notifications: false });
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await fetch('/api/user/checkuser');
            const data = await res.json();
            setUser(data.data);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };

    const submitData = async () => {
        if (user.notifications) {
            alert('You are already subscribed.');
            return;
        }

        try {
            const res = await fetch('/api/user/subscribe', {
                method: 'PATCH',
            });
            const data = await res.json();
            if (data.success) {
                alert('You Subscribed Successfully.');
            } else {
                alert('Error while subscribing.');
            }
        } catch (error) {
            console.error('An error occurred during subscription.');
        }
    };

    return (
        <div className='footer overflow-hidden w-screen'>
            <section className="banner bg-slate-500 w-full">
                <div className="flex flex-wrap justify-center py-10 text-custom-white px-4 sm:px-10 w-screen">
                    <div data-aos='slide-right' data-aos-duration="700" className="w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-4 mb-8">
                        <div className="flex mb-5 items-center">
                            <Image src={logo} width={75} height={75} alt="logo" />
                            <a className="text-custom-purple text-2xl font-bold mt-3 ml-2" href="#">
                                DevSkill Builder
                            </a>
                        </div>
                        <div className="text-justify">
                            DevSkill Builder is a unique coding platform. Join our community to collaborate, learn, and grow your coding skills together.
                        </div>
                    </div>
                    <div data-aos='slide-right' data-aos-duration="700" className="w-full sm:w-1/2 lg:w-1/4 mb-8 flex flex-col items-center text-center">
                        <span className="font-extrabold text-xl text-custom-purple mb-3">
                            Company
                        </span>
                        <ul>
                            <li className="mb-2 hover:text-custom-purple">About Us</li>
                            <li className="mb-2 hover:text-custom-purple">Services</li>
                            <li className="mb-2 hover:text-custom-purple">Our Works</li>
                            <li className="mb-2 hover:text-custom-purple">Playground</li>
                            <li className="mb-2 hover:text-custom-purple">Privacy Policy</li>
                            <li className="mb-2 hover:text-custom-purple">Terms & Conditions</li>
                        </ul>
                    </div>
                    <div data-aos='slide-left' data-aos-duration="700" className="w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-4 mb-8">
                        <div className="font-extrabold text-xl text-custom-purple mb-3">
                            Contact Us
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold flex items-center"><i className="fa fa-envelope mr-2" aria-hidden="true"></i>Email</h3>
                            <h3 className="ml-6">devskillbuilder@gmail.com</h3>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold flex items-center"><i className="fa fa-phone mr-2" aria-hidden="true"></i>Phone</h3>
                            <h3 className="ml-6">+91-8888888888</h3>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold flex items-center"><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>Address</h3>
                            <h3 className="ml-6">340 Main Street Los Angeles, CA 90291 United States.</h3>
                        </div>
                    </div>
                    <div data-aos='slide-left' data-aos-duration="700" className="w-full sm:w-1/2 lg:w-1/4 px-2 sm:px-4 mb-8">
                        <h4 className="font-extrabold text-xl text-custom-purple mb-3">Let's Stay Connected</h4>
                        <h4 className="text-custom-purple mb-3">Enter your Email to stay updated.</h4>
                        <div className="flex items-center space-x-2">
                            <input type="text" placeholder="Your Email" className="bg-transparent border-b-2 outline-none h-10 flex-1" value={user.email} disabled />
                            <button className="border-b-2 h-10 text-custom-purple hover:text-custom-white" onClick={submitData}>Submit</button>
                        </div>
                        <div className="mt-4">
                            <h3 className="mb-4 text-custom-purple font-extrabold text-2xl">Follow Us</h3>
                            <div className="flex justify-center space-x-4">
                                <i className="fa fa-linkedin bg-custom-purple p-3 rounded-full text-white" aria-hidden="true"></i>
                                <i className="fa fa-instagram bg-custom-purple p-3 rounded-full text-white" aria-hidden="true"></i>
                                <i className="fa fa-facebook bg-custom-purple p-3 rounded-full text-white" aria-hidden="true"></i>
                                <i className="fa fa-github bg-custom-purple p-3 rounded-full text-white" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="wave-container -mt-44">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    className="w-full"
                >
                    <defs>
                        <path
                            id="gentle-wave"
                            d="M-160 44c30 0 
        58-18 88-18s
        58 18 88 18 
        58-18 88-18 
        58 18 88 18
        v44h-352z"
                        />
                    </defs>
                    <g className="waves">
                        <use
                            xlinkHref="#gentle-wave"
                            x="50"
                            y="0"
                            fill="#7341c8"
                            fillOpacity=".2"
                        />
                        <use
                            xlinkHref="#gentle-wave"
                            x="50"
                            y="3"
                            fill="#7341c8"
                            fillOpacity=".5"
                        />
                        <use
                            xlinkHref="#gentle-wave"
                            x="50"
                            y="6"
                            fill="#7341c8"
                            fillOpacity=".9"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
}
