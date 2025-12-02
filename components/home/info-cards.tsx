import { useAuthStore } from '@/store/auth'
import { ButtonDarkPurple, ButtonDarkPurple1 } from '../game/buttons'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const InfoCards = () => {
  const { user } = useAuthStore()

  return (
    <>
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 mt-4">
          {/* Profile Card */}
          <div className="p-6 relative">
            <CardWrapperSvg />

            <div className="flex items-center gap-3 mb-4 relative z-10">
              {/* <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">TB</span>
              </div> */}
              <Image
                src="/images/avatar.svg"
                alt="avatar"
                className="w-12 h-12"
                width={12}
                height={12}
              />

              <div>
                <p className="text-gray-400 text-sm">Sup dawg,</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">TB732</span>
                  <span className="border border-brand-pink text-brand-pink text-xs px-1.5 py-0.5 rounded-md bg-[#EE4FFB]/30">
                    2
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 relative z-10">
              <div className="flex mb-2">
                <div
                  className="h-2 bg-brand-pink rounded-l-full"
                  style={{ width: '35%' }}
                ></div>
                <div className="h-2 bg-neutral-700 rounded-r-full flex-1"></div>
              </div>
            </div>

            <div className="flex justify-between text-sm relative z-10">
              <span className="text-white">
                <span className="font-bold">$1,399</span>
                <span className="text-gray-400 ml-1">played</span>
              </span>
              <span className="text-white">
                <span className="font-bold">$2,000.00</span>
                <span className="text-gray-400 ml-1">next level</span>
              </span>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="p-6 relative">
            <CardWrapperSvg />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-md flex items-center justify-center">
                {/* <svg
                  width="44"
                  height="41"
                  viewBox="0 0 44 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M16.12 8.2024e-05C12.34 -0.019918 8.66 3.62008 10.34 8.14008H4C2.93913 8.14008 1.92172 8.56151 1.17157 9.31166C0.421427 10.0618 0 11.0792 0 12.1401V16.1401C0 16.6705 0.210714 17.1792 0.585786 17.5543C0.960859 17.9294 1.46957 18.1401 2 18.1401H20V12.1401H24V18.1401H42C42.5304 18.1401 43.0391 17.9294 43.4142 17.5543C43.7893 17.1792 44 16.6705 44 16.1401V12.1401C44 11.0792 43.5786 10.0618 42.8284 9.31166C42.0783 8.56151 41.0609 8.14008 40 8.14008H33.66C36 1.60008 27.2 -3.01992 23.14 2.62008L22 4.14008L20.86 2.58008C19.6 0.800082 17.86 0.020082 16.12 8.2024e-05ZM16 4.14008C17.78 4.14008 18.68 6.30008 17.42 7.56008C16.16 8.82008 14 7.92008 14 6.14008C14 5.60965 14.2107 5.10094 14.5858 4.72587C14.9609 4.3508 15.4696 4.14008 16 4.14008ZM28 4.14008C29.78 4.14008 30.68 6.30008 29.42 7.56008C28.16 8.82008 26 7.92008 26 6.14008C26 5.60965 26.2107 5.10094 26.5858 4.72587C26.9609 4.3508 27.4696 4.14008 28 4.14008ZM2 20.1401V36.1401C2 37.201 2.42143 38.2184 3.17157 38.9685C3.92172 39.7187 4.93913 40.1401 6 40.1401H38C39.0609 40.1401 40.0783 39.7187 40.8284 38.9685C41.5786 38.2184 42 37.201 42 36.1401V20.1401H24V36.1401H20V20.1401H2Z"
                    fill="#EE4FFB"
                  />
                </svg> */}

                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.23922 1.75736L1.75715 6.23943C0.630034 7.36655 -0.00226125 8.89584 -0.000203083 10.4898L0.0404932 42.0077C0.044768 45.3184 2.7298 48 6.04048 48H37.5113C39.1026 48 40.6287 47.3679 41.7539 46.2426L46.2392 41.7574C47.3644 40.6321 47.9966 39.106 47.9966 37.5147V6C47.9966 2.68629 45.3103 0 41.9966 0H10.4819C8.89056 0 7.36444 0.632139 6.23922 1.75736Z"
                    fill="url(#paint0_linear_255_499)"
                  />
                  <path
                    d="M10.4819 0.5H41.9966C45.0341 0.5 47.4966 2.96243 47.4966 6V37.5146C47.4966 38.9733 46.9167 40.3719 45.8853 41.4033L41.3999 45.8887C40.3685 46.9201 38.9699 47.5 37.5112 47.5H6.04053C3.00573 47.5 0.544446 45.0416 0.540527 42.0068L0.499512 10.4893C0.497625 9.02811 1.07765 7.62596 2.11084 6.59277L6.59326 2.11133C7.62471 1.0799 9.02326 0.5 10.4819 0.5Z"
                    stroke="white"
                    stroke-opacity="0.1"
                  />
                  <path
                    d="M19.7915 19.2571C18.502 19.2571 17.4565 18.1753 17.4565 16.8415C17.4565 15.5066 18.502 14.4248 19.7915 14.4248C23.0606 14.4248 23.9946 19.2571 23.9946 19.2571"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M30.5325 16.8415C30.5325 15.5066 29.487 14.4248 28.1976 14.4248C24.9284 14.4248 23.9941 19.2571 23.9941 19.2571"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.2698 35.423H29.6819C32.1815 35.423 33.749 33.5546 33.749 30.9074V23.7698C33.749 21.1238 32.1894 19.2554 29.6819 19.2554H18.3125C15.8038 19.2554 14.2441 21.1238 14.2441 23.7698V30.9074C14.2441 33.5546 15.8038 35.423 18.3113 35.423H19.2605"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.9936 19.2554L21.3965 23.5665"
                    stroke="white"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.9941 19.2554C23.9941 19.2554 24.5061 22.6994 26.5917 23.5665"
                    stroke="white"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.9967 31.8194C23.5616 30.39 22.443 29.2714 21.0137 28.8362C22.443 28.4011 23.5616 27.2825 23.9967 25.853C24.4317 27.2825 25.5503 28.4011 26.9797 28.8362C26.4861 28.9865 26.0296 29.2183 25.6255 29.5161"
                    stroke="white"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_255_499"
                      x1="23.9966"
                      y1="-1"
                      x2="23.9966"
                      y2="48"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0.05" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  5 Available rewards
                </p>
                <p className="text-white text-lg font-bold">$73.22</p>
              </div>
            </div>

            <ButtonDarkPurple1 className="py-3" id="1">
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Go to Reward <ArrowRight className="w-4 h-4" />
              </span>
            </ButtonDarkPurple1>
          </div>

          <div className="p-6 relative">
            <CardWrapperSvg />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-md flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.23922 1.75736L1.75715 6.23943C0.630034 7.36655 -0.00226125 8.89584 -0.000203083 10.4898L0.0404932 42.0077C0.044768 45.3184 2.7298 48 6.04048 48H37.5113C39.1026 48 40.6287 47.3679 41.7539 46.2426L46.2392 41.7574C47.3644 40.6321 47.9966 39.106 47.9966 37.5147V6C47.9966 2.68629 45.3103 0 41.9966 0H10.4819C8.89056 0 7.36444 0.632139 6.23922 1.75736Z"
                    fill="url(#paint0_linear_255_499)"
                  />
                  <path
                    d="M10.4819 0.5H41.9966C45.0341 0.5 47.4966 2.96243 47.4966 6V37.5146C47.4966 38.9733 46.9167 40.3719 45.8853 41.4033L41.3999 45.8887C40.3685 46.9201 38.9699 47.5 37.5112 47.5H6.04053C3.00573 47.5 0.544446 45.0416 0.540527 42.0068L0.499512 10.4893C0.497625 9.02811 1.07765 7.62596 2.11084 6.59277L6.59326 2.11133C7.62471 1.0799 9.02326 0.5 10.4819 0.5Z"
                    stroke="white"
                    stroke-opacity="0.1"
                  />
                  <path
                    d="M26.6833 13.8636C25.8748 13.6722 25.0336 13.5591 24.1703 13.5591C18.4349 13.5591 13.7881 18.2176 13.7881 23.9413C13.7881 27.9529 16.0615 31.4313 19.3906 33.1599"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34.1926 21.2271C34.4271 22.0916 34.5507 23.0004 34.5507 23.9431C34.5507 29.6784 29.9051 34.3242 24.1709 34.3242"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M29.7695 24.2324C29.6354 27.2063 27.1667 29.5629 24.1707 29.5629C22.0918 29.5629 20.2792 28.4402 19.3057 26.7672"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.1813 18.3286H24.1708C21.4774 18.3286 19.231 20.214 18.6772 22.7301"
                    stroke="white"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34.7884 16.0923H32.1973V13.5"
                    stroke="white"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.6987 22.594L32.1994 16.0933"
                    stroke="white"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_255_499"
                      x1="23.9966"
                      y1="-1"
                      x2="23.9966"
                      y2="48"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white" stop-opacity="0.05" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  5 Available rewards
                </p>
                <p className="text-white text-lg font-bold">
                  Deposit $500 with Card
                </p>
              </div>
            </div>

            <ButtonDarkPurple1 className="py-3" id="2">
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                View next mission (35 lefts) <ArrowRight className="w-4 h-4" />
              </span>
            </ButtonDarkPurple1>
          </div>

          {/* Mission Card */}
          {/* <div className="p-6 relative">
            <CardWrapperSvg />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-12 h-12 bg-brand-pink/30 rounded-md flex items-center justify-center">
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M19.35 0V4.4505C15.566 4.93037 12.0488 6.65446 9.35161 9.35161C6.65446 12.0488 4.93037 15.566 4.4505 19.35H0V23.65H4.4505C4.93037 27.434 6.65446 30.9512 9.35161 33.6484C12.0488 36.3455 15.566 38.0696 19.35 38.5495V43H23.65V38.5495C27.434 38.0696 30.9512 36.3455 33.6484 33.6484C36.3455 30.9512 38.0696 27.434 38.5495 23.65H43V19.35H38.5495C38.0696 15.566 36.3455 12.0488 33.6484 9.35161C30.9512 6.65446 27.434 4.93037 23.65 4.4505V0M19.35 8.772V12.9H23.65V8.7935C29.025 9.675 33.325 13.975 34.228 19.35H30.1V23.65H34.2065C33.325 29.025 29.025 33.325 23.65 34.228V30.1H19.35V34.2065C13.975 33.325 9.675 29.025 8.772 23.65H12.9V19.35H8.7935C9.675 13.975 13.975 9.675 19.35 8.772ZM21.5 19.35C20.9298 19.35 20.3829 19.5765 19.9797 19.9797C19.5765 20.3829 19.35 20.9298 19.35 21.5C19.35 22.0702 19.5765 22.6171 19.9797 23.0203C20.3829 23.4235 20.9298 23.65 21.5 23.65C22.0702 23.65 22.6171 23.4235 23.0203 23.0203C23.4235 22.6171 23.65 22.0702 23.65 21.5C23.65 20.9298 23.4235 20.3829 23.0203 19.9797C22.6171 19.5765 22.0702 19.35 21.5 19.35Z"
                    fill="#EE4FFB"
                  />
                </svg>
              </div>
              <div>
                <p className="text-brand-pink text-sm font-medium">
                  Next Mission
                </p>
                <p className="text-white font-bold">
                  Deposit $500 or more with Card
                </p>
              </div>
            </div>

            <div className="flex gap-3 relative z-10">
              <button className="bg-gradient-brand-pink text-white font-medium py-2 px-4 rounded-md transition-colors">
                View next mission
              </button>
              <span className="text-brand-pink bg-brand-pink/30 font-medium py-2 px-4 rounded-md transition-colors">
                35 more mission lefts
              </span>
            </div>
          </div> */}
        </div>
      )}
    </>
  )
}

export default InfoCards

const CardWrapperSvg = () => {
  return (
    <svg
      // width="344"
      // height="156"
      viewBox="0 0 344 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="none" // <— important
    >
      {/* <foreignObject x="-400" y="-400" width="1144" height="956">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style="backdrop-filter:blur(200px);clip-path:url(#bgblur_0_5136_14933_clip_path);height:100%;width:100%"
        ></div>
      </foreignObject> */}
      <path
        data-figma-bg-blur-radius="400"
        d="M26.4854 0.5H338C341.038 0.5 343.5 2.96244 343.5 6V129.515C343.5 130.973 342.92 132.372 341.889 133.403L321.403 153.889C320.372 154.92 318.973 155.5 317.515 155.5H6C2.96244 155.5 0.5 153.038 0.5 150V26.4854C0.5 25.0267 1.0799 23.6281 2.11133 22.5967L22.5967 2.11133C23.6281 1.0799 25.0267 0.5 26.4854 0.5Z"
        fill="url(#paint0_linear_5136_14933)"
        stroke="url(#paint1_linear_5136_14933)"
      />
      <defs>
        <clipPath
          id="bgblur_0_5136_14933_clip_path"
          transform="translate(400 400)"
        >
          <path d="M26.4854 0.5H338C341.038 0.5 343.5 2.96244 343.5 6V129.515C343.5 130.973 342.92 132.372 341.889 133.403L321.403 153.889C320.372 154.92 318.973 155.5 317.515 155.5H6C2.96244 155.5 0.5 153.038 0.5 150V26.4854C0.5 25.0267 1.0799 23.6281 2.11133 22.5967L22.5967 2.11133C23.6281 1.0799 25.0267 0.5 26.4854 0.5Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_5136_14933"
          x1="189.067"
          y1="87.5732"
          x2="189.067"
          y2="156.386"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#11042F" />
          <stop offset="1" stop-color="#020106" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5136_14933"
          x1="0.756451"
          y1="87.8939"
          x2="50.9594"
          y2="215.538"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EE4FFB" stop-opacity="0.2" />
          <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  )
}
