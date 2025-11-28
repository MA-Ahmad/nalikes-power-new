import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function Banner() {
  return (
    <section
      className="relative w-full bg-cover bg-center flex items-start sm:items-center justify-center overflow-hidden rounded-2xl h-[16rem] sm:h-auto"
      // style={{ backgroundImage: "url('/images/home/banner.png')" }}
    >
      <Image
        src={'/images/home/banner.svg'}
        alt="Banner"
        width={1920}
        height={600}
        className="w-full h-full object-cover "
      />
      <div className=" z-10 flex flex-col items-start lg:flex-row justify-center md:justify-between sm:items-center w-full gap-1 gap-2 sm:gap-4 py-4 absolute px-4 md:px-8 lg:px-12 ">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start text-center  sm:space-y-3">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white  tracking-tight">
            BITCOIN <span className="text-brand-pink">HASH</span> HUNT
          </h1>
          <img
            src={'/images/home/prize.svg'}
            alt="Prize"
            className="w-[12rem] md:w-[14rem] lg:w-auto"
          />
          {/* <Link
            href="#"
            className="items-center justify-center hidden sm:inline-flex lg:px-5 lg:py-2.5 px-3 py-1.5 rounded-lg text-brand-pink font-semibold text-base bg-brand-pink/10 border border-brand-pink/20 hover:bg-brand-pink/20 transition-all"
          >
            Join the Game <ArrowRight className="ml-2 h-4 w-4" />
          </Link> */}

          <PinkButton className="py-3 px-8">
            <span className="relative text-pink-light whitespace-nowrap flex items-center justify-center">
              Join the Game <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </PinkButton>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center lg:items-start text-center md:text-right sm:space-y-1">
          <h2 className="text-lg sm:text-xl lg:text-lg font-semibold text-white tracking-tight w-full text-center">
            <span className="text-[#B9B5D6]">Next Round:</span> Monday, 12 Aug
          </h2>
          <div className=" space-x-2 md:space-x-0 flex sm:flex">
            <div className="flex flex-col items-center justify-center size-14 lg:size-16 bg-brand-pink/20 rounded-lg border-2 border-brand-pink/20 text-brand-pink text-base md:text-xl gap-0.5">
              <span className="text-xl md:tex-lg lg:text-3xl font-bold leading-none text-white">
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
            <div className="flex flex-col items-center justify-center size-14 lg:size-16 bg-brand-pink/20 rounded-lg border-2 border-brand-pink/20 text-brand-pink text-base md:text-xl gap-0.5">
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
            <div className="flex flex-col items-center justify-center size-14 lg:size-16 bg-brand-pink/20 rounded-lg border-2 border-brand-pink/20 text-brand-pink text-base md:text-xl gap-0.5">
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

const PinkButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'relative inline-block w-full min-w-[40px] px-3 py-1 cursor-pointer cut-corner-button',
          className
        )}
        onClick={onClick}
      >
        <svg
          // width="225"
          // height="60"
          viewBox="0 0 225 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <foreignObject x="-60" y="-60" width="345" height="180">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(30px)',
                clipPath: 'url(#bgblur_0_5142_12299_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <path
            data-figma-bg-blur-radius="60"
            d="M17.6562 0.5H219C222.038 0.5 224.5 2.96243 224.5 6V46.6826C224.5 48.575 223.527 50.3347 221.924 51.3408L210.268 58.6582C209.391 59.2081 208.378 59.5 207.344 59.5H6C2.96243 59.5 0.5 57.0376 0.5 54V13.3174C0.500097 11.425 1.47347 9.66532 3.07617 8.65918L14.7324 1.3418C15.6085 0.791861 16.6219 0.500039 17.6562 0.5Z"
            fill="url(#paint0_linear_5142_12299)"
            stroke="#EE4FFB"
          />
          <defs>
            <clipPath
              id="bgblur_0_5142_12299_clip_path"
              transform="translate(60 60)"
            >
              <path d="M17.6562 0.5H219C222.038 0.5 224.5 2.96243 224.5 6V46.6826C224.5 48.575 223.527 50.3347 221.924 51.3408L210.268 58.6582C209.391 59.2081 208.378 59.5 207.344 59.5H6C2.96243 59.5 0.5 57.0376 0.5 54V13.3174C0.500097 11.425 1.47347 9.66532 3.07617 8.65918L14.7324 1.3418C15.6085 0.791861 16.6219 0.500039 17.6562 0.5Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_5142_12299"
              x1="112.5"
              y1="0"
              x2="112.5"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EE4FFB" stop-opacity="0.2" />
              <stop offset="1" stop-color="#EE4FFB" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {children}
      </div>
    </div>
  )
}
