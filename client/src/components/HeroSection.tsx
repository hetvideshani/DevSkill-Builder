"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { HeroParallax } from "./ui/hero-parallax";
import Navbar from "./Navbar";
import '../css/herosection.css';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Compiler } from './Compiler';
import Footer from "./Footer";
import polygon1 from '../../public/assets/images/Polygon 1.png';
import polygon2 from '../../public/assets/images/Polygon 2.png';

// Dynamically import AnimatedSVG and AOS (client-side only)
const AnimatedSVG = dynamic(() => import("./ui/AnimatedSVG"), { ssr: false });
import AOS from "aos";

export function HeroSection() {
    const image1Ref = useRef<HTMLImageElement>(null);
    const image2Ref = useRef<HTMLImageElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const { ref: inViewRef1, inView: inView1 } = useInView();
    const { ref: inViewRef2, inView: inView2 } = useInView();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Initialize AOS animation
            AOS.init({ duration: 3000 });

            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        if (image1Ref.current) {
            if (!inView1) {
                image1Ref.current.style.transform = `translateY(${scrollPosition * -0.1}px)`;
            } else {
                image1Ref.current.style.transform = `translateY(0px)`;
            }
        }

        if (image2Ref.current) {
            if (!inView2) {
                image2Ref.current.style.transform = `translateY(${scrollPosition * -0.1}px)`;
            } else {
                image2Ref.current.style.transform = `translateY(0px)`;
            }
        }
    }, [scrollPosition, inView1, inView2]);

    return (
        <div className="bg-black max-w-screen">
            <Navbar />
            <HeroParallax products={products} />
            <div className="relative z-10 flex mt-10 justify-around">
                <div className="flex-1 text-custom-white mt-10 ms-32">
                    <div data-aos="fade-right" data-aos-duration="1400" className="font-causten text-5xl">Have an Idea?</div>
                    <div data-aos="fade-right" data-aos-duration="1400" className="text-5xl font-bold mt-5">Let's make it alive together.</div>
                    <div data-aos="fade-right" data-aos-duration="1400" data-aos-delay='500' className="mt-10 text-lg w-3/4 leading-8">DevEchelon is a unique coding platform where you can solve specific programming questions, share your solutions, and connect with fellow developers. Join our community to collaborate, learn, and grow your coding skills together.</div>
                    <div data-aos="fade-right" data-aos-duration="1400" data-aos-delay='500'><button className="btn rounded-xl border border-custom-white bg-custom-purple px-3 py-2 mt-5">Start Coding</button></div>
                </div>
                <div className="flex-1">
                    <AnimatedSVG />
                </div>
            </div>
            <div className="relative z-0 -mt-96 flex justify-between">
                <div ref={inViewRef1}>
                    <Image className="w-52 h-60 mb-48" ref={image1Ref} src={polygon1} style={{ transition: 'transform 2.0s ease-out' }} alt="shape" />
                </div>
                <div ref={inViewRef2}>
                    <Image className="w-60 h-72 mt-72" ref={image2Ref} src={polygon2} style={{ transition: 'transform 2.0s ease-out' }} alt="shape" />
                </div>
            </div>
            <div className="mb-40 w-screen">
                <Compiler />
            </div>
            <div className="w-screen">
                <Footer />
            </div>
        </div>
    );
}

export const products = [
    {
        title: "Moonbeam",
        link: "/",
        thumbnail: "/assets/images/heroimg7.png",
    },
    {
        title: "Cursor",
        link: "https://cursor.so",
        thumbnail: "/assets/images/heroimg2.png",
    },
    {
        title: "Rogue",
        link: "/Compiler/1",
        thumbnail: "/assets/images/heroimg3.png",
    },
    {
        title: "Editorially",
        link: "/",
        thumbnail: "/assets/images/heroimg4.png",
    },
    {
        title: "Editrix AI",
        link: "https://editrix.ai",
        thumbnail: "/assets/images/heroimg5.png",
    },
    {
        title: "Pixel Perfect",
        link: "https://app.pixelperfect.quest",
        thumbnail: "/assets/images/heroimg6.png",
    },
    {
        title: "Algochurn",
        link: "https://algochurn.com",
        thumbnail: "/assets/images/heroimg5.png",
    },
    {
        title: "Aceternity UI",
        link: "https://ui.aceternity.com",
        thumbnail: "/assets/images/heroimg6.png",
    },
    {
        title: "Tailwind Master Kit",
        link: "https://tailwindmasterkit.com",
        thumbnail: "/assets/images/heroimg4.png",
    },
];
