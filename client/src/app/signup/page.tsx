"use client";
import React, { useEffect, useState } from 'react';
import "@/css/Signup.css";
import Image from 'next/image';
import Logo from "../../../public/assets/images/logo.png";
import Link from 'next/link';
import { IoMdArrowBack } from "react-icons/io";
import { useRouter as nrouter } from 'next/navigation';
import { global_email } from '../globals';
import { setGlobalEmail } from '../globals';

const SignUp = () => {
	const [loader, setLoader] = useState(false);
	const [active, setActive] = useState<string>("");
	const router = nrouter();
	const [formError, setFormError] = useState({
		title: "",
		message: ""
	});
	const [loginUser, setLoginUser] = useState({
		email: "",
		password: ""
	});
	const [signupUser, setsignupUser] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		confirm_password: ""
	});

	useEffect(() => {
		const firstElement = document.getElementById("first");
		const secondElement = document.getElementById("second");
		const thirdElement = document.getElementById("third");

		if (!firstElement || !secondElement || !thirdElement) return;

		const removeClasses = () => {
			firstElement.classList.remove('animated-card', 'rotate-normal');
			secondElement.classList.remove('animated-card', 'rotate-normal');
			thirdElement.classList.remove('animated-card', 'rotate-normal');
		};

		if (active === "first") {
			secondElement.classList.add("animated-card");
			firstElement.classList.add("rotate-normal");
			setTimeout(() => {
				secondElement.style.zIndex = "30";
				secondElement.style.transform = "rotate(7deg)";
				firstElement.style.transform = "rotate(0deg)";
				thirdElement.style.zIndex = "20";
				thirdElement.style.transform = "rotate(-7deg)";
				firstElement.style.zIndex = "50";
				setTimeout(removeClasses, 1400);
			}, 1600);
		} else if (active === "second") {
			firstElement.classList.add('animated-card');
			secondElement.classList.add('rotate-normal');
			setTimeout(() => {
				firstElement.style.zIndex = "30";
				secondElement.style.transform = "rotate(0deg)";
				firstElement.style.transform = "rotate(7deg)";
				thirdElement.style.zIndex = "20";
				thirdElement.style.transform = "rotate(-7deg)";
				secondElement.style.zIndex = "50";
				setTimeout(removeClasses, 1400);
			}, 1600);
		} else if (active === "third") {
			firstElement.style.zIndex = "20";
			secondElement.classList.add("animated-card");
			thirdElement.classList.add("rotate-normal");
			setTimeout(() => {
				thirdElement.style.zIndex = "50";
				secondElement.style.zIndex = "30";
				firstElement.style.transform = "rotate(7deg)";
				thirdElement.style.transform = "rotate(0deg)";
				secondElement.style.transform = "rotate(-7deg)";
				setTimeout(removeClasses, 1400);
			}, 1600);
		} else if (active === "fourth") {
			secondElement.style.zIndex = "20";
			firstElement.style.zIndex = "30";
			thirdElement.classList.add("animated-card");
			firstElement.classList.add("rotate-normal");
			setTimeout(() => {
				firstElement.style.zIndex = "50";
				thirdElement.style.zIndex = "30";
				firstElement.style.transform = "rotate(0deg)";
				thirdElement.style.transform = "rotate(7deg)";
				secondElement.style.transform = "rotate(-7deg)";
				setTimeout(removeClasses, 1400);
			}, 1600);
		} else if (active === "fifth") {
			firstElement.style.zIndex = "20";
			thirdElement.classList.add("animated-card");
			secondElement.classList.add("rotate-normal");
			setTimeout(() => {
				secondElement.style.zIndex = "50";
				thirdElement.style.zIndex = "30";
				secondElement.style.transform = "rotate(0deg)";
				thirdElement.style.transform = "rotate(-7deg)";
				firstElement.style.transform = "rotate(7deg)";
				setTimeout(removeClasses, 1400);
			}, 1600);
		} else {
			firstElement.style.transform = "rotate(0deg)";
			firstElement.style.zIndex = "50";
			secondElement.style.transform = "rotate(7deg)";
			secondElement.style.zIndex = "30";
			thirdElement.style.zIndex = "20";
			thirdElement.style.transform = "rotate(-7deg)";
		}
	}, [active]);



	const checkUser = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { email, password } = loginUser;

			if (!email) {
				setLoader(false);
				setFormError({ ...formError, title: "lemail", message: "Enter Email" });
				return null;
			}
			else if (!password) {
				setLoader(false);
				setFormError({ ...formError, title: "lpassword", message: "Enter Password" });
				return null;
			}

			const response = await fetch("/api/user/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email, password
				})
			});
			const data = await response.json();

			if (data.success) {
				setGlobalEmail(email);
				setLoader(false);
				router.push("/otpverification");
			} else {
				setLoader(false);
				setFormError({ ...formError, title: "lpassword", message: "Credentials are incorrect." });
			}
		} catch (err) {
			console.error(err);
		}
	};

	const registerUser = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { firstname, lastname, username, email, password, confirm_password } = signupUser;

			if (!firstname) {
				setFormError({ ...formError, title: "lfirstname", message: "Enter firstname" });
				setLoader(false);
				return;
			}
			else if (!lastname) {
				setFormError({ ...formError, title: "llastname", message: "Enter lastname" });
				setLoader(false);
				return;
			}
			else if (!username) {
				setFormError({ ...formError, title: "lusername", message: "Enter username" });
				setLoader(false);
				return;
			}
			else if (!email) {
				setFormError({ ...formError, title: "lemail", message: "Enter email" });
				setLoader(false);
				return;
			}
			else if (!password) {
				setFormError({ ...formError, title: "leail", message: "Enter email" });
				setLoader(false);
				return;
			}

			if (password !== confirm_password) {
				setFormError({ ...formError, title: "cpassword", message: "Password mismatched!" });
				setLoader(false);
				return;
			}

			const response = await fetch("/api/user/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					firstname, lastname, username, email, password
				})
			});
			const data = await response.json();
			if (data.success) {
				setGlobalEmail(email);
				setLoader(false);
				router.push("/otpverification");
			} else {
				alert("error");
				setLoader(false);
			}
		} catch (error) {
			setLoader(false);
		}
	};

	return (
		<div className='bg-black h-screen w-screen fixed flex justify-center items-center'>
			<div id='first' className='absolute rounded-md h-3/4 w-[31%] border border-[#E1E1E1] flex flex-col items-center bg-[#E2E2E2] drop-shadow-2xl'>
				<div className='w-full h-[20%] mb-1'>
					<Image src={Logo} alt="Logo" className='object-contain h-full w-auto mx-auto mt-4 mix-blend-darken rounded-full' />
				</div>
				<h1 className='text-3xl mt-4 mb-4 font-extrabold'>Login</h1>
				<div className='w-full h-[52%] mb-1'>
					<form className='h-full w-full flex justify-start flex-col mt-4' onSubmit={checkUser}>
						<div className="input-group mb-8 mt-3 w-[90%] mx-auto">
							<input type="email" required className='w-full rounded bg-transparent border-b-2 border-black outline-none' value={loginUser.email} name='email' onChange={(e) => { setLoginUser({ ...loginUser, email: e.target.value }) }} />
							<span className="highlight"></span>
							<span className="bar"></span>
							<label>Email</label>
							<span className={formError.title == "lemail" ? "text-red-800" : "hidden"}>{formError.message}</span>
						</div>

						<div className="input-group mb-5 w-[90%] mx-auto">
							<input type="password" required className='w-full rounded bg-transparent border-b-2 border-black outline-none' value={loginUser.password} name='password' onChange={(e) => { setLoginUser({ ...loginUser, password: e.target.value }) }} />
							<span className="highlight"></span>
							<span className="bar"></span>
							<label>Password</label>
							<span className={formError.title == "lpassword" ? "text-red-800" : "hidden"}>{formError.message}</span>
						</div>
						<p className='ml-6'>
							<Link className='text-gray-900' href={"/"}>forgot password?</Link>
						</p>
						{loader ? <button type="submit" className="p-[3px] relative w-[90%] mt-3 mx-auto">
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
							<div className="center mx-auto h-[80%] w-[70%]">
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
								<div className="wave w-full h-[20px]"></div>
							</div>
						</button> :
							<button type="submit" className="p-[3px] relative w-[90%] mt-3 mx-auto" onClick={() => { setLoader(true) }}>
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
								<div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-medium">
									Login
								</div>
							</button>}
					</form>
				</div>
				<h1 className='text-lg mt-3'>Don't have an account?&nbsp;
					<button className='text-[#7341e8]' onClick={() => { setActive("second") }}>sign up</button>
				</h1>
			</div>

			<div id='second' className='absolute rounded-md h-3/4 w-[31%] border border-[#E1E1E1] flex flex-col items-center bg-[#E2E2E2] drop-shadow-2xl'>
				<div className='w-full h-[20%] mb-1'>
					<Image src={Logo} alt="Logo" className='object-contain h-full w-auto mx-auto mt-4 mix-blend-darken rounded-full' />
				</div>
				<h1 className='text-3xl mt-4 mb-4 font-extrabold'>Sign Up</h1>
				<div className='w-full h-[52%] mb-1 flex flex-col'>
					<div className="input-group w-[90%] mx-auto mb-4 mt-5">
						<input type="text" className='w-full rounded bg-transparent border-b-2 border-black outline-none' required value={signupUser.firstname} onChange={(e) => {
							setsignupUser({ ...signupUser, firstname: e.target.value });
						}} onFocus={() => {
							setFormError({ ...formError, title: "", message: "" });
						}} />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>First Name</label>
						<span className={formError.title == "firstname" ? "text-red-800" : "hidden"}>{formError.message}</span>
					</div>

					<div className="input-group w-[90%] mx-auto mb-4 mt-1">
						<input type="text" required className='w-full rounded bg-transparent border-b-2 border-black outline-none' value={signupUser.lastname} onChange={(e) => {
							setsignupUser({ ...signupUser, lastname: e.target.value });
						}} onFocus={() => {
							setFormError({ ...formError, title: "", message: "" });
						}} />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Last Name</label>
						<span className={formError.title == "lastname" ? "text-red-800" : "hidden"}>{formError.message}</span>
					</div>
					<div className="input-group w-[90%] mx-auto mb-4 mt-1">
						<input type="text" className='w-full rounded bg-transparent border-b-2 border-black outline-none' required value={signupUser.username} onChange={(e) => {
							setsignupUser({ ...signupUser, username: e.target.value });
						}} onFocus={() => {
							setFormError({ ...formError, title: "", message: "" });
						}} />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Username</label>
						<span className={formError.title == "username" ? "text-red-800" : "hidden"}>{formError.message}</span>
					</div>{loader ? <button type="submit" className="p-[3px] relative w-[90%] mt-3 pt-0 mx-auto">
						<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
						<div className="center mx-auto h-[80%] w-[70%]">
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
						</div>
					</button> :
						<button className="p-[3px] relative w-[90%] mx-auto" type="button" onClick={() => {
							if (signupUser.firstname !== "" && signupUser.lastname !== "" && signupUser.username !== "") {
								setActive("third");
							}
							else {
								if (signupUser.firstname === '') {
									setFormError({ ...formError, title: "firstname", message: "Enter firstname" });
								}
								else if (signupUser.lastname === "") {
									setFormError({ ...formError, title: "lastname", message: "Enter last name" });
								}
								else {
									setFormError({ ...formError, title: "username", message: "Enter username" });
								}
								return null;
							}
						}
						}>
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
							<div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-medium">
								Next
							</div>
						</button>}
				</div>
				<h1 className='text-lg mt-3'>Already have an account?&nbsp;
					<button className='text-[#7341e8] cursor-pointer' onClick={() => { setActive("first") }}>login</button>
				</h1>
			</div>

			<div id='third' className='absolute rounded-md h-3/4 w-[31%] border border-[#E1E1E1] flex flex-col items-center bg-[#E2E2E2] drop-shadow-2xl'>
				<div className='w-full h-[20%] mb-1 flex flex-col'>
					{
						active === "third" ?
							<IoMdArrowBack className='absolute mt-2 ml-2' size={25} onClick={() => { setActive("fifth") }} /> : null
					}
					<Image src={Logo} alt="Logo" className='object-contain h-full w-auto mx-auto mt-4 mix-blend-darken rounded-full' />
				</div>
				<h1 className='text-3xl mt-4 mb-4'>Sign Up</h1>
				<div className='w-full h-[52%] mb-1 flex flex-col'>
					<div className="input-group w-[90%] mx-auto mb-4 mt-5">
						<input type="email" className='w-full rounded bg-transparent border-b-2 border-black' value={signupUser.email} onChange={(e) => {
							setsignupUser({ ...signupUser, email: e.target.value });
						}} onFocus={() => {
							setFormError({ ...formError, title: "", message: "" });
						}} required />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Email Address</label>
						<span className={formError.title == "email" ? "text-red-800" : "hidden"}>{formError.message}</span>
					</div>

					<div className="input-group w-[90%] mx-auto mb-4 mt-1">
						<input type="password" className='w-full rounded bg-transparent border-b-2 border-black' value={signupUser.password}
							onChange={(e) => {
								setsignupUser({ ...signupUser, password: e.target.value });
							}} onFocus={() => {
								setFormError({ ...formError, title: "", message: "" });
							}} required />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Password</label>
						<span className={formError.title == "password" ? "text-red-800" : "hidden"}>{formError.message}</span>
					</div>
					<div className="input-group w-[90%] mx-auto mb-4 mt-1">
						<input type="password" className='w-full rounded bg-transparent border-b-2 border-black' required value={signupUser.confirm_password}
							onChange={(e) => {
								setsignupUser({ ...signupUser, confirm_password: e.target.value });
							}} onFocus={() => {
								setFormError({ ...formError, title: "", message: "" });
							}} />
						<span className="highlight"></span>
						<span className="bar"></span>
						<label>Confirm Password</label>
						<span className={formError.title == "cpassword" ? "text-red-800" : "hidden"}>{formError.message}</span>
					</div>
					{loader ? <button type="submit" className="p-[3px] relative w-[90%] mt-3 mx-auto">
						<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
						<div className="center mx-auto h-[80%] w-[70%]">
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
							<div className="wave w-full h-[20px]"></div>
						</div>
					</button>
						:
						<button className="p-[3px] relative w-[90%] mx-auto" type="submit" onClick={(e) => {
							if (signupUser.email !== "" && signupUser.password !== "" && signupUser.confirm_password !== "") {
								setActive("third");
								setLoader(true);
								registerUser(e);
							}
							else {
								if (signupUser.email === '') {
									setFormError({ ...formError, title: "email", message: "Enter email" });
								}
								else if (signupUser.password === "") {
									setFormError({ ...formError, title: "password", message: "Enter password" });
								}
								else {
									setFormError({ ...formError, title: "cpassword", message: "Enter confirm password" });
								}
								setLoader(false);
								return null;
							}
						}}>
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
							<div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-medium">
								Sign up
							</div>
						</button>}
				</div>
				<h1 className='text-lg mt-5'>Already have an account?&nbsp;
					<button className='text-[#7341e8]' onClick={() => { setActive("fourth") }}>login</button>
				</h1>
			</div>
		</div>
	);
}

export default SignUp;