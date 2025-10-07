'use client'

import Navbar from '@/components/home/navbar'
import Image from 'next/image'
import banner from '@/public/images/banner.png'
import { SectionCards } from '@/components/home/section-cards'
import { useState } from 'react'
import { ChatSidebar } from '@/components/home/chat/chat-sidebar'
import newBanner from '@/public/images/new-banner.png'
import Banner from '@/components/home/banner'
import InfoCards from '@/components/home/info-cards'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex pt-16">
        <main
          className={`flex-1 px-4 py-8 transition-all duration-300 ease-in-out ${
            isChatOpen ? 'lg:mr-80' : 'lg:mr-0'
          }`}
        >
          <div className="max-w-[1500px] mx-auto">
            <Banner />
            <div className="my-8">
              <svg
                width="106"
                height="33"
                viewBox="0 0 106 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.92854 1.59437L1.92687 6.21856C0.698465 7.35425 0 8.95123 0 10.6242V27C0 30.3137 2.68629 33 6 33H93.8156C95.1685 33 96.4818 32.5428 97.5421 31.7025L103.726 26.8016C105.163 25.6636 106 23.9316 106 22.0992V6C106 2.68629 103.314 0 100 0H11.0017C9.49171 0 8.03726 0.569322 6.92854 1.59437Z"
                  fill="url(#paint0_linear_5001_6012)"
                />
                <path
                  d="M11.002 0.5H100C103.038 0.500004 105.5 2.96244 105.5 6V22.0996C105.5 23.7792 104.732 25.367 103.416 26.4102L97.2314 31.3105C96.2595 32.0808 95.0556 32.5 93.8154 32.5H6C2.96243 32.5 0.5 30.0376 0.5 27V10.624C0.500045 9.09054 1.14061 7.62695 2.2666 6.58594L7.26758 1.96191C8.28391 1.02229 9.61782 0.5 11.002 0.5Z"
                  stroke="#6F6BFF"
                  stroke-opacity="0.6"
                />

                <foreignObject x="0" y="0" width="100%" height="100%">
                  <div
                    // @ts-ignore
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="flex items-center justify-center w-full h-full text-indigo-700 font-semibold"
                  >
                    Button Text
                  </div>
                </foreignObject>
                <defs>
                  <linearGradient
                    id="paint0_linear_5001_6012"
                    x1="-38.2357"
                    y1="-3.64399"
                    x2="-38.2357"
                    y2="33.3814"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#6F6BFF" stop-opacity="0.2" />
                    <stop offset="1" stop-color="#6F6BFF" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative inline-block">
                <svg
                  width="200" // control size
                  height="60"
                  viewBox="0 0 106 33"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block"
                  // preserveAspectRatio="none" // makes it stretch edge to edge
                >
                  <path
                    d="M6.92854 1.59437L1.92687 6.21856C0.698465 7.35425 0 8.95123 0 10.6242V27C0 30.3137 2.68629 33 6 33H93.8156C95.1685 33 96.4818 32.5428 97.5421 31.7025L103.726 26.8016C105.163 25.6636 106 23.9316 106 22.0992V6C106 2.68629 103.314 0 100 0H11.0017C9.49171 0 8.03726 0.569322 6.92854 1.59437Z"
                    fill="url(#paint0_linear_5001_6012)"
                  />
                  <path
                    d="M11.002 0.5H100C103.038 0.500004 105.5 2.96244 105.5 6V22.0996C105.5 23.7792 104.732 25.367 103.416 26.4102L97.2314 31.3105C96.2595 32.0808 95.0556 32.5 93.8154 32.5H6C2.96243 32.5 0.5 30.0376 0.5 27V10.624C0.500045 9.09054 1.14061 7.62695 2.2666 6.58594L7.26758 1.96191C8.28391 1.02229 9.61782 0.5 11.002 0.5Z"
                    stroke="#6F6BFF"
                    strokeOpacity="0.6"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_5001_6012"
                      x1="-38.2357"
                      y1="-3.64399"
                      x2="-38.2357"
                      y2="33.3814"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6F6BFF" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#6F6BFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <span className="absolute inset-0 flex items-center justify-center text-indigo-700 font-semibold">
                  Button Text
                </span>
              </div>

              <div className="relative inline-block">
                <Image
                  src="/images/banner-bg.png"
                  width={5000}
                  height={5000}
                  className="w-full h-full object-cover absolute top-0 left-0"
                  // placeholder="blur"
                  alt="Banner"
                />
                <svg
                  width="1064"
                  height="340"
                  viewBox="0 0 1064 340"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <foreignObject
                    x="-399.995"
                    y="-400"
                    width="1863.99"
                    height="1140"
                  >
                    <div
                      // @ts-ignore
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        backdropFilter: 'blur(200px)',
                        clipPath: 'url(#bgblur_0_3290_2794_clip_path)',
                        height: '100%',
                        width: '100%',
                      }}
                    ></div>
                  </foreignObject>
                  <path
                    data-figma-bg-blur-radius="400"
                    d="M28.1426 0.5H1054C1059.25 0.5 1063.5 4.7533 1063.5 10V311.857C1063.5 314.377 1062.5 316.794 1060.72 318.575L1042.58 336.718C1040.79 338.499 1038.38 339.5 1035.86 339.5H10.3896C5.14766 339.5 0.896316 335.254 0.889648 330.012L0.504883 28.1494C0.501673 25.6257 1.50352 23.2035 3.28809 21.4189L21.4248 3.28223C23.2064 1.50074 25.6231 0.5 28.1426 0.5Z"
                    fill="url(#paint0_linear_3290_2794)"
                    stroke="url(#paint1_linear_3290_2794)"
                  />
                  <defs>
                    <clipPath
                      id="bgblur_0_3290_2794_clip_path"
                      transform="translate(399.995 400)"
                    >
                      <path d="M28.1426 0.5H1054C1059.25 0.5 1063.5 4.7533 1063.5 10V311.857C1063.5 314.377 1062.5 316.794 1060.72 318.575L1042.58 336.718C1040.79 338.499 1038.38 339.5 1035.86 339.5H10.3896C5.14766 339.5 0.896316 335.254 0.889648 330.012L0.504883 28.1494C0.501673 25.6257 1.50352 23.2035 3.28809 21.4189L21.4248 3.28223C23.2064 1.50074 25.6231 0.5 28.1426 0.5Z" />
                    </clipPath>
                    <linearGradient
                      id="paint0_linear_3290_2794"
                      x1="532"
                      y1="170"
                      x2="532"
                      y2="340"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#11042F" />
                      <stop offset="1" stop-color="#020106" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3290_2794"
                      x1="-4.28663e-05"
                      y1="170.792"
                      x2="111.986"
                      y2="496.398"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#EE4FFB" stop-opacity="0.2" />
                      <stop
                        offset="1"
                        stop-color="#F8DBCE"
                        stop-opacity="0.05"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <InfoCards />
            {/* Banner Image */}
            <div className="mb-8 mt-8">
              {/* <Image
                src={newBanner}
                alt="Banner"
                layout="responsive"
                width={1920}
                height={600}
                className="rounded-lg"
                placeholder="blur"
              /> */}
              <Image
                src={newBanner}
                alt="Banner"
                width={1920}
                height={600}
                className="rounded-lg object-cover w-full h-full cursor-pointer"
                placeholder="blur"
                onClick={() => {
                  router.push('/post-launch')
                }}
              />
            </div>
            <SectionCards />
          </div>
        </main>

        {/* Chat Sidebar - Part of layout on desktop, overlay on mobile */}
        <ChatSidebar isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </div>
  )
}
