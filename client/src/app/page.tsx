import Image from "next/image";
import localFont from "next/font/local";
import { HeroSection } from "@/components/HeroSection";
import { Poppins } from '@next/font/google';
import './globals.css';


export default function Home() {
  return (
    <div className="poppins.className w-[100%]">
      <HeroSection />
    </div>
  );
}
