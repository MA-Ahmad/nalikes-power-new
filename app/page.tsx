"use client";

import Navbar from "@/components/home/navbar";
import Image from "next/image";
import banner from "@/public/images/banner.png";
import { SectionCards } from "@/components/home/section-cards";
import { useState } from "react";
import { ChatSidebar } from "@/components/home/chat/chat-sidebar";
import newBanner from "@/public/images/new-banner.png";
import Banner from "@/components/home/banner";
import InfoCards from "@/components/home/info-cards";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      <div className="relative pt-10">
        <Image
          src={"/images/home/hero.png"}
          alt="Banner"
          width={1920}
          height={600}
          className="w-full h-full object-cover "
        />
        <div className="absolute top-16 sm:top-20 lg:top-[15%] left-1/2 -translate-x-1/2  flex items-center justify-center flex-col text-center gap-2">
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold ">
            Enter The PWR City
          </h1>
          <p className="md:text-xl">Gamble Like a Degen. Win Like a Degen</p>
        </div>
      </div>
      <div className="flex ">
        <main
          className={`flex-1 px-4 py-4 transition-all duration-300 ease-in-out ${
            isChatOpen ? "lg:mr-80" : "lg:mr-0"
          }`}
        >
          <div className="max-w-[1500px] mx-auto space-y-8 sm:space-y-20">
            <div className="">
              <h1 className="text-lg sm:text-2xl font-bold text-center mb-8">
                PWR Originals
              </h1>
              <Image
                src={"/images/home/cards.png"}
                alt="Banner"
                width={1920}
                height={600}
                className="w-full h-full object-cover "
              />
            </div>
            <div className="">
              <Banner />
            </div>
            <SectionCards />
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
      <div className="flex items-center justify-center mt-52 pb-20">
        <div className="h-32 w-[400px] bg-brand-pink/30 rounded-full  blur-3xl "></div>
      </div>
    </div>
  );
}
