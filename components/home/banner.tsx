import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Banner() {
  return (
    <section
      className="relative w-full bg-cover bg-center flex items-start sm:items-center justify-center overflow-hidden rounded-2xl h-[16rem] sm:h-auto"
      // style={{ backgroundImage: "url('/images/home/banner.png')" }}
    >
      <Image
        src={'/images/home/banner.png'}
        alt="Banner"
        width={1920}
        height={600}
        className="w-full h-full object-cover "
      />
      <div className=" z-10 flex flex-col items-start lg:flex-row justify-center md:justify-between sm:items-center w-full gap-1 gap-2 sm:gap-4 py-4 absolute px-4 md:px-8 lg:px-12 ">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center  sm:space-y-3">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-white  tracking-tight">
            BITCOIN <span className="text-brand-pink">HASH</span> HUNT
          </h1>
          <img
            src={'/images/home/prize.png'}
            alt="Prize"
            className="w-[12rem] sm:w-auto"
          />
          <Link
            href="#"
            className="items-center justify-center hidden sm:inline-flex lg:px-5 lg:py-2.5 px-3 py-1.5 rounded-lg text-brand-pink font-semibold text-base bg-brand-pink/10 border border-brand-pink/20 hover:bg-brand-pink/20 transition-all"
          >
            Join the Game <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-right sm:space-y-3">
          <h2 className="text-lg sm:text-2xl lg:text-2xl font-semibold text-white tracking-tight">
            <span className="text-[#B9B5D6]">Next Round:</span> Monday, 12 Aug
          </h2>
          <div className=" space-x-2 md:space-x-0 flex sm:flex">
            <div className="flex flex-col items-center justify-center size-14 lg:size-20 bg-brand-pink/20 rounded-lg border-2 border-brand-pink/20 text-brand-pink  text-base md:text-xl gap-2">
              <span className="text-xl lg:text-3xl font-bold leading-none text-white">
                02
              </span>
              <span className="text-xs lg:text-sm leading-none uppercase text-pink-light font-bold">
                days
              </span>
            </div>
            <div className="flex flex-col items-center justify-center mx-2 gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="flex flex-col items-center justify-center size-14 lg:size-20 bg-brand-pink/20 rounded-lg border-2 border-brand-pink/20 text-brand-pink  text-base md:text-xl gap-2">
              <span className="text-xl lg:text-3xl font-bold leading-none text-white">
                18
              </span>
              <span className="text-xs lg:text-sm leading-none uppercase text-pink-light font-bold">
                hours
              </span>
            </div>
            <div className="flex flex-col items-center justify-center mx-2 gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="flex flex-col items-center justify-center size-14 lg:size-20 bg-brand-pink/20 rounded-lg border-2 border-brand-pink/20 text-brand-pink  text-base md:text-xl gap-2">
              <span className="text-xl lg:text-3xl font-bold leading-none text-white">
                34
              </span>
              <span className="text-xs lg:text-sm leading-none uppercase text-pink-light font-bold">
                min
              </span>
            </div>
          </div>
        </div>

        <Link
          href="#"
          className="items-center justify-center inline-flex md:hidden px-3 py-1.5 rounded-lg text-brand-pink font-semibold text-base bg-brand-pink/10 border border-brand-pink/20 hover:bg-brand-pink/20 transition-all"
        >
          Join the Game <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
