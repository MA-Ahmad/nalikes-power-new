'use client'

import bitcoinImage from '@/public/images/spin-card-images/bitcoin.png'
import jacketImage from '@/public/images/spin-card-images/jacket.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import PrizeSpinnerOld from './prize-spinner-old'
import PrizeSpinner from './prize-spinner'

interface Prize {
  id: string
  image: string
  text: string
  amount: string
  off: string
}

const prizes: Prize[] = [
  {
    id: '1',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '1000',
    off: '10%',
  },
  {
    id: '2',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '10,000',
    off: '10%',
  },
  {
    id: '3',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '5000',
    off: '20%',
  },
  {
    id: '4',
    image: bitcoinImage.src,
    text: 'Lamborghini Cuntach',
    amount: '250',
    off: '30%',
  },
  {
    id: '5',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '2,700',
    off: '40%',
  },
  {
    id: '6',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '750',
    off: '10%',
  },
  {
    id: '7',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '500',
    off: '20%',
  },
  {
    id: '8',
    image: jacketImage.src,
    text: 'Lamborghini Cuntach',
    amount: '2,500',
    off: '10%',
  },
]

export default function PostLaunch() {
  return (
    // <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div className="flex flex-col gap-4">
      <PrizeSpinner />

      {/* <PrizeSpinnerOld /> */}

      <div className="flex flex-col gap-4 justify-center items-center w-full lg:max-w-[850px] mx-auto">
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Insane Drops</h3>

            <div className="relative inline-flex items-center justify-center px-4 py-3">
              <svg
                viewBox="0 0 193 48"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none" // <— important
              >
                <path
                  d="M15.291 0.5H187C190.038 0.5 192.5 2.96243 192.5 6V36.5605C192.5 38.5133 191.464 40.3199 189.779 41.3066L180.488 46.7461C179.645 47.2396 178.686 47.5 177.709 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V11.4395L0.511719 11.0752C0.631754 9.26407 1.64086 7.61844 3.2207 6.69336L12.5117 1.25391C13.2493 0.822042 14.0762 0.568246 14.9258 0.511719L15.291 0.5Z"
                  fill="url(#paint0_linear_5008_5436)"
                  stroke="#9CF350"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5008_5436"
                    x1="96.5"
                    y1="0"
                    x2="96.5"
                    y2="48"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#9CF350" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#9CF350" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="relative text-green-base font-semibold whitespace-nowrap">
                See More Insane Drops
              </span>
            </div>

            {/* <a href="#" className="italic underline text-sm w-full text-right">
              Insane Drops
            </a> */}
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {prizes.slice(0, 4).map((prize) => (
              <div className="relative inline-block w-full max-w-[200px]">
                <svg
                  width="200"
                  height="220"
                  viewBox="0 0 200 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <foreignObject x="-60" y="-60" width="320" height="340">
                    <div
                      // @ts-ignore
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        backdropFilter: 'blur(30px)',
                        clipPath: 'url(#bgblur_0_5013_5439_clip_path)',
                        height: '100%',
                        width: '100%',
                      }}
                    ></div>
                  </foreignObject>
                  <path
                    data-figma-bg-blur-radius="60"
                    d="M18.4854 0.5H194C197.038 0.5 199.5 2.96243 199.5 6V201.515C199.5 202.973 198.92 204.372 197.889 205.403L185.403 217.889C184.372 218.92 182.973 219.5 181.515 219.5H6C2.96243 219.5 0.5 217.038 0.5 214V18.4854L0.506836 18.2129C0.574195 16.8534 1.14428 15.5637 2.11133 14.5967L14.5967 2.11133C15.6281 1.0799 17.0267 0.5 18.4854 0.5Z"
                    fill="url(#paint0_linear_5013_5439)"
                    stroke="#9CF350"
                  />
                  <defs>
                    <clipPath
                      id="bgblur_0_5013_5439_clip_path"
                      transform="translate(60 60)"
                    >
                      <path d="M18.4854 0.5H194C197.038 0.5 199.5 2.96243 199.5 6V201.515C199.5 202.973 198.92 204.372 197.889 205.403L185.403 217.889C184.372 218.92 182.973 219.5 181.515 219.5H6C2.96243 219.5 0.5 217.038 0.5 214V18.4854L0.506836 18.2129C0.574195 16.8534 1.14428 15.5637 2.11133 14.5967L14.5967 2.11133C15.6281 1.0799 17.0267 0.5 18.4854 0.5Z" />
                    </clipPath>
                    <linearGradient
                      id="paint0_linear_5013_5439"
                      x1="100"
                      y1="0"
                      x2="100"
                      y2="220"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9CF350" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#9CF350" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <Image
                  src="/images/mystery-box/pattern-green.png"
                  alt="Bitcoin"
                  width={200}
                  height={220}
                  className="absolute top-0 left-0"
                />

                <div className="absolute top-0 w-full px-4 py-2 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-1 justify-end">
                    <p className="text-sm font-semibold text-green-light">
                      x33
                    </p>
                    <svg
                      width="13"
                      height="17"
                      viewBox="0 0 13 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.61921 3.7002C3.94594 3.7002 3.40015 4.24599 3.40015 4.91925V12.0807C3.40015 12.754 3.94594 13.2998 4.61921 13.2998H5.16253C5.8358 13.2998 6.38159 12.754 6.38159 12.0807V11.1009C6.38159 10.4276 6.92738 9.88184 7.60065 9.88184H8.58148C9.25475 9.88184 9.80054 9.33604 9.80054 8.66278V4.91925C9.80054 4.24599 9.25475 3.7002 8.58148 3.7002H4.61921ZM12.9998 8.88055C12.9998 9.55382 12.454 10.0996 11.7807 10.0996H11.2374C10.5641 10.0996 10.0183 10.6454 10.0183 11.3187V12.2995C10.0183 12.9728 9.47252 13.5186 8.79925 13.5186H7.8194C7.14613 13.5186 6.60034 14.0643 6.60034 14.7376V15.2809C6.60034 15.9542 6.05455 16.5 5.38128 16.5H4.61921C3.94594 16.5 3.40015 15.9542 3.40015 15.2809V14.6644C3.40015 13.9911 2.85436 13.4453 2.18109 13.4453H1.41901C0.745743 13.4453 0.199951 12.8995 0.199951 12.2263V4.91925C0.199951 4.24599 0.745743 3.7002 1.41901 3.7002H2.10785C2.78111 3.7002 3.3269 3.1544 3.3269 2.48114V1.71906C3.3269 1.04579 3.8727 0.5 4.54596 0.5H8.65374C9.32701 0.5 9.8728 1.04579 9.8728 1.71906V2.48114C9.8728 3.1544 10.4186 3.7002 11.0919 3.7002H11.7807C12.454 3.7002 12.9998 4.24599 12.9998 4.91925V8.88055Z"
                        fill="#BCF788"
                      />
                    </svg>
                  </div>

                  <div className="w-24 h-24 flex items-center justify-center w-full mt-2">
                    <img
                      src="/images/spin-card-images/bitcoin.png"
                      alt="Prize"
                      className={cn(
                        'w-full h-full object-contain filter drop-shadow-lg'
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-green-light">
                      DropForge
                    </p>
                    <div className="flex items-center gap-1">
                      <p>$2,50</p>
                      <div
                        className="border border-green-base rounded-md flex items-center text-sm justify-center p-1 leading-none text-green-base"
                        style={{
                          background: 'rgba(156, 243, 80, 0.3)',
                        }}
                      >
                        -18%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Mad Drops</h3>

            <div className="relative inline-flex items-center justify-center px-4 py-3">
              <svg
                // width="178"
                // height="48"
                viewBox="0 0 178 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <foreignObject x="-60" y="-60" width="298" height="168">
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      backdropFilter: 'blur(30px)',
                      clipPath: 'url(#bgblur_0_5013_7203_clip_path)',
                      height: '100%',
                      width: '100%',
                    }}
                  ></div>
                </foreignObject>
                <path
                  data-figma-bg-blur-radius="60"
                  d="M14.3457 0.5H172C175.038 0.5 177.5 2.96243 177.5 6V36.7021C177.5 38.5847 176.537 40.3367 174.947 41.3457L166.603 46.6436C165.721 47.2031 164.698 47.5 163.654 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V11.2979L0.510742 10.9463C0.62244 9.19906 1.56279 7.60016 3.05273 6.6543L11.3975 1.35645C12.2788 0.796924 13.3017 0.5 14.3457 0.5Z"
                  fill="url(#paint0_linear_5013_7203)"
                  stroke="#FDC61C"
                />
                <defs>
                  <clipPath
                    id="bgblur_0_5013_7203_clip_path"
                    transform="translate(60 60)"
                  >
                    <path d="M14.3457 0.5H172C175.038 0.5 177.5 2.96243 177.5 6V36.7021C177.5 38.5847 176.537 40.3367 174.947 41.3457L166.603 46.6436C165.721 47.2031 164.698 47.5 163.654 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V11.2979L0.510742 10.9463C0.62244 9.19906 1.56279 7.60016 3.05273 6.6543L11.3975 1.35645C12.2788 0.796924 13.3017 0.5 14.3457 0.5Z" />
                  </clipPath>
                  <linearGradient
                    id="paint0_linear_5013_7203"
                    x1="89"
                    y1="0"
                    x2="89"
                    y2="48"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FDC61C" stop-opacity="0.2" />
                    <stop offset="1" stop-color="#FDC61C" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="relative text-yellow-base font-semibold whitespace-nowrap">
                See More Mad Drops
              </span>
            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {prizes.slice(0, 4).map((prize) => (
              <div className="relative inline-block w-full max-w-[200px]">
                <svg
                  width="200"
                  height="220"
                  viewBox="0 0 200 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    data-figma-bg-blur-radius="60"
                    d="M18.4854 0.5H194C197.038 0.5 199.5 2.96243 199.5 6V201.515C199.5 202.973 198.92 204.372 197.889 205.403L185.403 217.889C184.372 218.92 182.973 219.5 181.515 219.5H6C2.96243 219.5 0.5 217.038 0.5 214V18.4854L0.506836 18.2129C0.574195 16.8534 1.14428 15.5637 2.11133 14.5967L14.5967 2.11133C15.6281 1.0799 17.0267 0.5 18.4854 0.5Z"
                    fill="url(#paint0_linear_5013_7206)"
                    stroke="#FDC61C"
                  />
                  <defs>
                    <clipPath
                      id="bgblur_0_5013_7206_clip_path"
                      transform="translate(60 60)"
                    >
                      <path d="M18.4854 0.5H194C197.038 0.5 199.5 2.96243 199.5 6V201.515C199.5 202.973 198.92 204.372 197.889 205.403L185.403 217.889C184.372 218.92 182.973 219.5 181.515 219.5H6C2.96243 219.5 0.5 217.038 0.5 214V18.4854L0.506836 18.2129C0.574195 16.8534 1.14428 15.5637 2.11133 14.5967L14.5967 2.11133C15.6281 1.0799 17.0267 0.5 18.4854 0.5Z" />
                    </clipPath>
                    <linearGradient
                      id="paint0_linear_5013_7206"
                      x1="183.028"
                      y1="-124.3"
                      x2="183.028"
                      y2="220"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FDC61C" stop-opacity="0.2" />
                      <stop offset="1" stop-color="#FDC61C" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <Image
                  src="/images/mystery-box/pattern-yellow.png"
                  alt="Bitcoin"
                  width={200}
                  height={220}
                  className="absolute top-0 left-0"
                />

                <div className="absolute top-0 w-full px-4 py-2 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-1 justify-end">
                    <p className="text-sm font-semibold text-yellow-light">
                      x33
                    </p>
                    <svg
                      width="13"
                      height="17"
                      viewBox="0 0 13 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.61921 3.7002C3.94594 3.7002 3.40015 4.24599 3.40015 4.91925V12.0807C3.40015 12.754 3.94594 13.2998 4.61921 13.2998H5.16253C5.8358 13.2998 6.38159 12.754 6.38159 12.0807V11.1009C6.38159 10.4276 6.92738 9.88184 7.60065 9.88184H8.58148C9.25475 9.88184 9.80054 9.33604 9.80054 8.66278V4.91925C9.80054 4.24599 9.25475 3.7002 8.58148 3.7002H4.61921ZM12.9998 8.88055C12.9998 9.55382 12.454 10.0996 11.7807 10.0996H11.2374C10.5641 10.0996 10.0183 10.6454 10.0183 11.3187V12.2995C10.0183 12.9728 9.47252 13.5186 8.79925 13.5186H7.8194C7.14613 13.5186 6.60034 14.0643 6.60034 14.7376V15.2809C6.60034 15.9542 6.05455 16.5 5.38128 16.5H4.61921C3.94594 16.5 3.40015 15.9542 3.40015 15.2809V14.6644C3.40015 13.9911 2.85436 13.4453 2.18109 13.4453H1.41901C0.745743 13.4453 0.199951 12.8995 0.199951 12.2263V4.91925C0.199951 4.24599 0.745743 3.7002 1.41901 3.7002H2.10785C2.78111 3.7002 3.3269 3.1544 3.3269 2.48114V1.71906C3.3269 1.04579 3.8727 0.5 4.54596 0.5H8.65374C9.32701 0.5 9.8728 1.04579 9.8728 1.71906V2.48114C9.8728 3.1544 10.4186 3.7002 11.0919 3.7002H11.7807C12.454 3.7002 12.9998 4.24599 12.9998 4.91925V8.88055Z"
                        fill="#FEDF81"
                      />
                    </svg>
                  </div>

                  <div className="w-24 h-24 flex items-center justify-center w-full mt-2">
                    <img
                      src="/images/spin-card-images/bitcoin.png"
                      alt="Prize"
                      className={cn(
                        'w-full h-full object-contain filter drop-shadow-lg'
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-green-light">
                      DropForge
                    </p>
                    <div className="flex items-center gap-1">
                      <p>$2,50</p>
                      <div
                        className="border border-yellow-base rounded-md flex items-center text-sm justify-center p-1 leading-none text-yellow-base"
                        style={{
                          background: 'rgba(253, 198, 28, 0.3)',
                        }}
                      >
                        -18%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <WinSpinner /> */}
    </div>
    // </div>
  )
}
