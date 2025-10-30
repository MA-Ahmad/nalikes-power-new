'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUp } from 'lucide-react'
import JackpotDtawsBox from './jackpot-screen'
import { ButtonDarkPurple, ButtonGreen, ButtonRed } from '../game/buttons'
import { GlowCheckbox } from '@/components/ui/glow-checkbox'
import { FireIcon } from '@/components/icons'
import { GreenGlowBox } from '@/components/ui/glow-box'
import { useState } from 'react'

export default function Draws({
  setScreen,
}: {
  setScreen: (screen: string) => void
}) {
  return (
    <div className="relative w-full h-full max-w-[1450px] mx-auto">
      <SvgContainer />

      <div className="relative flex gap-2 justify-center items-center w-full h-full max-w-[1450px] mx-auto p-6">
        <div
          className="relative basis-1/3 h-full"
          // style={{ height: 'calc(100% - 2rem)' }}
        >
          <svg
            //   width="616"
            //   height="933"
            viewBox="0 0 616 933"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full object-cover"
            preserveAspectRatio="none" // <— important
          >
            <g clip-path="url(#clip0_3308_19833)">
              {/* <foreignObject
                x="-616.721"
                y="-616.725"
                width="1848.63"
                height="2166.25"
              >
                <div
                  // @ts-ignore
                  //   xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backdropFilter: 'blur(308.36px)',
                    clipPath: 'url(#bgblur_1_3308_19833_clip_path)',
                    height: '100%',
                    width: '100%',
                  }}
                ></div>
              </foreignObject> */}
              <path
                data-figma-bg-blur-radius="616.725"
                d="M44.7129 0.770508H599.765C607.854 0.770508 614.412 7.3286 614.412 15.418V878.319C614.412 881.488 613.384 884.572 611.482 887.107L582.188 926.166C579.422 929.854 575.081 932.025 570.471 932.025H16.0273C7.94205 932.025 1.38575 925.474 1.37988 917.389L0.774414 54.4824C0.772277 51.3099 1.80061 48.2226 3.7041 45.6846L32.9951 6.62988C35.7613 2.94165 40.1026 0.770508 44.7129 0.770508Z"
                fill="url(#paint0_linear_3308_19833)"
                stroke="url(#paint1_linear_3308_19833)"
                stroke-width="1.54181"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_1_3308_19833_clip_path"
                transform="translate(616.721 616.725)"
              >
                <path d="M44.7129 0.770508H599.765C607.854 0.770508 614.412 7.3286 614.412 15.418V878.319C614.412 881.488 613.384 884.572 611.482 887.107L582.188 926.166C579.422 929.854 575.081 932.025 570.471 932.025H16.0273C7.94205 932.025 1.38575 925.474 1.37988 917.389L0.774414 54.4824C0.772277 51.3099 1.80061 48.2226 3.7041 45.6846L32.9951 6.62988C35.7613 2.94165 40.1026 0.770508 44.7129 0.770508Z" />
              </clipPath>
              <linearGradient
                id="paint0_linear_3308_19833"
                x1="307.591"
                y1="0"
                x2="307.591"
                y2="932.796"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#11042F" />
                <stop offset="1" stop-color="#020106" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_3308_19833"
                x1="-2.77071e-05"
                y1="4.34668"
                x2="559.595"
                y2="175.793"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EE4FFB" stop-opacity="0.2" />
                <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
              </linearGradient>
              <clipPath id="clip0_3308_19833">
                <rect
                  width="615.183"
                  height="932.796"
                  rx="15.4181"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>

          <div className="relative h-full">
            <LeftBoxCreateTicket />
          </div>
        </div>
        <div
          className="relative basis-1/3 h-full"
          // style={{ height: 'calc(100% - 2rem)' }}
        >
          <svg
            //   width="616"
            //   height="933"
            viewBox="0 0 616 933"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full object-cover"
            preserveAspectRatio="none" // <— important
          >
            <g clip-path="url(#clip0_3308_19833)">
              <path
                data-figma-bg-blur-radius="616.725"
                d="M44.7129 0.770508H599.765C607.854 0.770508 614.412 7.3286 614.412 15.418V878.319C614.412 881.488 613.384 884.572 611.482 887.107L582.188 926.166C579.422 929.854 575.081 932.025 570.471 932.025H16.0273C7.94205 932.025 1.38575 925.474 1.37988 917.389L0.774414 54.4824C0.772277 51.3099 1.80061 48.2226 3.7041 45.6846L32.9951 6.62988C35.7613 2.94165 40.1026 0.770508 44.7129 0.770508Z"
                fill="url(#paint0_linear_3308_19833)"
                stroke="url(#paint1_linear_3308_19833)"
                stroke-width="1.54181"
              />
            </g>
            <defs>
              <clipPath
                id="bgblur_1_3308_19833_clip_path"
                transform="translate(616.721 616.725)"
              >
                <path d="M44.7129 0.770508H599.765C607.854 0.770508 614.412 7.3286 614.412 15.418V878.319C614.412 881.488 613.384 884.572 611.482 887.107L582.188 926.166C579.422 929.854 575.081 932.025 570.471 932.025H16.0273C7.94205 932.025 1.38575 925.474 1.37988 917.389L0.774414 54.4824C0.772277 51.3099 1.80061 48.2226 3.7041 45.6846L32.9951 6.62988C35.7613 2.94165 40.1026 0.770508 44.7129 0.770508Z" />
              </clipPath>
              <linearGradient
                id="paint0_linear_3308_19833"
                x1="307.591"
                y1="0"
                x2="307.591"
                y2="932.796"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#11042F" />
                <stop offset="1" stop-color="#020106" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_3308_19833"
                x1="-2.77071e-05"
                y1="4.34668"
                x2="559.595"
                y2="175.793"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EE4FFB" stop-opacity="0.2" />
                <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
              </linearGradient>
              <clipPath id="clip0_3308_19833">
                <rect
                  width="615.183"
                  height="932.796"
                  rx="15.4181"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>

          <CenteredBoxContent setScreen={setScreen} />
        </div>
        <div className="relative h-full basis-2/3 overflow-hidden">
          <RightBoxSvg2 />
          <Image
            src="/images/city-mask.svg"
            alt="Green Mask"
            width={200}
            height={220}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <JackpotDtawsBox />
        </div>
      </div>
    </div>
  )
}

const LeftBoxCreateTicket = () => {
  const characters = '123456D'
  const [tickets, setTickets] = useState<any[]>([])
  const [ticket, setTicket] = useState<any[]>([])

  const handleTicketChange = (item: any) => {
    if (ticket.includes(item)) {
      setTicket(ticket.filter((i) => i !== item))
    } else {
      if (ticket.length < 7) setTicket([...ticket, item])
    }
  }

  const handleTicketSubmit = () => {
    setTickets([...tickets, ticket])
  }

  const handleTicketDelete = () => {
    setTicket([])
  }

  const handleTicketEdit = (index: number) => {
    setTickets(tickets.map((ticket, i) => (i === index ? ticket : ticket)))
  }

  const isSelected0 = ticket.includes(0)

  return (
    <div className="absolute inset-0 flex flex-col text-white justify-between z-10 p-[0.975rem] px-3">
      <div className="w-full">
        <div className="mt-6 flex flex-col gap-6 items-center justify-center">
          <h2 className="text-3xl font-bold text-white uppercase">
            Pick 7 Characters
          </h2>
          <div className="w-full h-[1px] bg-white/10 px-20 z-[55] mx-10" />
        </div>

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6 relative mt-6">
            <div className="rounded-lg bg-white/10 border border-[#6C7793]/80 grid grid-cols-7 items-center text-2xl font-bold p-4 min-h-[4.5rem]">
              {Array.from({ length: 7 }).map((_, index) => (
                <span key={index + 'TT'} className="flex justify-center">
                  {ticket[index] || ''}
                </span>
              ))}
            </div>

            <div className="flex items-start justify-between w-full gap-4">
              {/* Left side: Digits grid */}
              <div className="grid grid-cols-3 gap-2 basis-1/2 justify-items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                  const isSelected = ticket.includes(item)
                  if (isSelected)
                    return (
                      <GreenGlowBox
                        size="xss"
                        className="cursor-pointer"
                        onClick={() => handleTicketChange(item)}
                      >
                        {item}
                      </GreenGlowBox>
                    )

                  return (
                    <div
                      key={item + 'D'}
                      className="w-10 h-10 rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-center cursor-pointer"
                      onClick={() => handleTicketChange(item)}
                    >
                      {item}
                    </div>
                  )
                })}

                {/* Empty space for centering 0 */}
                <div></div>

                {/* 0 centered at bottom */}
                {isSelected0 ? (
                  <GreenGlowBox
                    size="xss"
                    className="cursor-pointer"
                    onClick={() => handleTicketChange(0)}
                  >
                    0
                  </GreenGlowBox>
                ) : (
                  <div
                    className="w-10 h-10 rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTicketChange(0)}
                  >
                    0
                  </div>
                )}

                <div></div>
              </div>

              {/* Right side: A–F grid */}
              <div className="grid grid-cols-3 gap-2 basis-1/2 justify-items-center cursor-pointer">
                {['A', 'B', 'C', 'D', 'E', 'F'].map((item) => {
                  const isSelected = ticket.includes(item)
                  if (isSelected)
                    return (
                      <GreenGlowBox
                        size="xss"
                        className="cursor-pointer"
                        onClick={() => handleTicketChange(item)}
                      >
                        {item}
                      </GreenGlowBox>
                    )

                  return (
                    <div
                      key={item + 'C'}
                      className="w-10 h-10 rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-center"
                      onClick={() => handleTicketChange(item)}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <ButtonGreen>
          <span className="relative text-[#9CF350] font-semibold whitespace-nowrap flex items-center justify-center">
            Lucky Dip
          </span>
        </ButtonGreen>
        <div className="flex items-center gap-4">
          <ButtonRed onClick={() => handleTicketDelete()}>
            <span className="relative text-[#F35050] font-semibold whitespace-nowrap flex items-center justify-center">
              Clear
            </span>
          </ButtonRed>
          <ButtonDarkPurple>
            <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
              Save
            </span>
          </ButtonDarkPurple>
        </div>
      </div>
    </div>
  )
}

const LeftBoxContent = () => {
  return (
    <div className="absolute inset-0 flex flex-col text-white justify-between z-10 p-[0.975rem] px-3">
      <div className="w-full">
        <div className="mt-6 flex flex-col gap-6 items-center justify-center">
          <h2 className="text-3xl font-bold text-white uppercase">
            Create Ticket
          </h2>
          <div className="w-full h-[1px] bg-white/10 px-20 z-[55] mx-10" />
        </div>

        <div className="flex flex-col gap-2 relative mt-6">
          <LeftCurveSvg />

          <div className="flex items-center gap-2 pt-6 px-6 z-[55] w-full">
            <p className="text-xl">$2.5</p>
            <p className="text-[#B9B5D6] text-sm">/line</p>
          </div>

          <section
            className="rounded-2xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm mt-4 relative mx-4"
            style={{
              background: 'linear-gradient(180deg, #11042F 0%, #140831 100%)',
              borderImage:
                'linear-gradient(135deg, rgba(129, 83, 234, 0.2) 0%, rgba(248, 219, 206, 0.05) 100%) 1',
              boxShadow: `
            inset 0 12.33px 24.67px rgba(61, 46, 153, 0.48)
          `,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border bg-[#30244f] shadow-[0_0_20px_6px_rgba(118,80,255,0.6)]"
                style={{
                  borderColor: '#535979',
                  borderWidth: '1.54px',
                }}
              >
                1
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-center">
                  D
                </div>
              ))}
              +
              <div
                className={`
        w-10 h-10
        rounded-lg
        bg-[#300333]
        border border-[#EE4FFB]
        flex items-center justify-center
        backdrop-blur-[17.62px]
      `}
                style={{
                  boxShadow: `
          inset 0 12.33px 24.67px rgba(238, 79, 251, 0.25),
          inset 0 12.33px 12.33px rgba(238, 79, 251, 0.24),
          inset 0 0.8px 0.4px rgba(238, 79, 251, 1)
        `,
                }}
              >
                <FireIcon className="size-5 text-[#EE4FFB]" />
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-4">
              <ButtonDarkPurple>
                <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                  Edit
                </span>
              </ButtonDarkPurple>
              <ButtonGreen>
                <span className="relative text-[#9CF350] font-semibold whitespace-nowrap flex items-center justify-center">
                  Lucky Dip
                </span>
              </ButtonGreen>
            </div>
          </section>

          <section
            className="rounded-2xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm mt-6 mb-6 relative mx-4"
            style={{
              background: 'linear-gradient(180deg, #11042F 0%, #140831 100%)',
              borderImage:
                'linear-gradient(135deg, rgba(129, 83, 234, 0.2) 0%, rgba(248, 219, 206, 0.05) 100%) 1',
              boxShadow: `
            inset 0 12.33px 24.67px rgba(61, 46, 153, 0.48)
          `,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border bg-[#30244f] shadow-[0_0_20px_6px_rgba(118,80,255,0.6)]"
                style={{
                  borderColor: '#535979',
                  borderWidth: '1.54px',
                }}
              >
                2
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-center">
                  D
                </div>
              ))}
              +
              <div
                className={`
        w-10 h-10
        rounded-lg
        bg-[#300333]
        border border-[#EE4FFB]
        flex items-center justify-center
        backdrop-blur-[17.62px]
      `}
                style={{
                  boxShadow: `
          inset 0 12.33px 24.67px rgba(238, 79, 251, 0.25),
          inset 0 12.33px 12.33px rgba(238, 79, 251, 0.24),
          inset 0 0.8px 0.4px rgba(238, 79, 251, 1)
        `,
                }}
              >
                <FireIcon className="size-5 text-[#EE4FFB]" />
              </div>
            </div>

            <div className="flex items-center justify-between w-full mt-4">
              <ButtonDarkPurple>
                <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                  Edit
                </span>
              </ButtonDarkPurple>
              <ButtonGreen>
                <span className="relative text-[#9CF350] font-semibold whitespace-nowrap flex items-center justify-center">
                  Lucky Dip
                </span>
              </ButtonGreen>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const CenteredBoxContent = ({
  setScreen,
}: {
  setScreen: (screen: string) => void
}) => {
  return (
    <div className="absolute inset-0 flex flex-col text-white justify-between z-10 p-[0.975rem] px-3">
      <div className="w-full">
        <div className="mt-6 flex flex-col gap-6 items-center justify-center">
          <h2 className="text-3xl font-bold text-white">Select Events</h2>
          <div className="w-full h-[1px] bg-white/10 px-20 z-[55] mx-10" />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/images/bitcoin.svg"
                alt="Bitcoin"
                width={20}
                height={20}
                className="size-8"
              />
              <p className="text-[#FDC61C] text-xl">0.023234</p>
            </div>

            <p className="text-[#B9B5D6] text-sm">/Events</p>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <div className="rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-between p-3">
              <span>21 May ~18:00 UTC Block 822,917</span>
              <GlowCheckbox size="md" defaultChecked />
            </div>
            <div className="rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-between p-3">
              <span>21 May ~18:00 UTC Block 822,917</span>
              <GlowCheckbox size="md" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <ButtonDarkPurple onClick={() => setScreen('ticket-bought')}>
          <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
            Buy $234
          </span>
        </ButtonDarkPurple>
      </div>
    </div>
  )
}

const SvgContainer = () => {
  return (
    <svg
      // width="1500"
      // height="1007"
      viewBox="0 0 1770 1007"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="none" // <— important
    >
      <foreignObject x="-616.725" y="-616.725" width="3003.45" height="2240.25">
        <div
          //   xmlns="http://www.w3.org/1999/xhtml"
          style={{
            backdropFilter: 'blur(308.36px)',
            clipPath: 'url(#bgblur_0_3308_19820_clip_path)',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </foreignObject>
      <path
        data-figma-bg-blur-radius="616.725"
        d="M46.2959 0.770508H1751.5C1761.29 0.770508 1769.23 8.70948 1769.23 18.502V951.292C1769.23 955.132 1767.98 958.868 1765.68 961.938L1737.88 998.949C1734.53 1003.41 1729.28 1006.03 1723.7 1006.03H18.502C8.70959 1006.03 0.770673 998.094 0.770508 988.302V55.5117C0.770508 51.6715 2.01815 47.935 4.32422 44.8643L32.1172 7.85449C35.4662 3.395 40.7189 0.770508 46.2959 0.770508Z"
        fill="url(#paint0_linear_3308_19820)"
        stroke="url(#paint1_linear_3308_19820)"
        stroke-width="1.54181"
      />
      <mask
        id="mask0_3308_19820"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1770"
        height="1007"
      >
        <path
          d="M31.5227 7.82279L3.39299 47.6212C1.18537 50.7445 0 54.4753 0 58.3001V988.301C0 998.52 8.28349 1006.8 18.5017 1006.8H1723.75C1729.57 1006.8 1735.05 1004.06 1738.55 999.403L1766.3 962.399C1768.7 959.196 1770 955.301 1770 951.298V18.5017C1770 8.28351 1761.72 0 1751.5 0H46.6315C40.6238 0 34.9902 2.91689 31.5227 7.82279Z"
          fill="url(#paint2_linear_3308_19820)"
        />
      </mask>
      <g mask="url(#mask0_3308_19820)">
        <g filter="url(#filter1_f_3308_19820)">
          <path
            d="M37.0034 -19.4146C37.0034 -20.8082 37.2486 -22.1447 37.6851 -23.1302C38.1215 -24.1156 38.7135 -24.6692 39.3307 -24.6692H158.021C158.638 -24.6692 159.23 -24.1156 159.667 -23.1302C160.103 -22.1447 160.348 -20.8082 160.348 -19.4146V121.803H39.3307C38.7135 121.803 38.1215 121.249 37.6851 120.264C37.2486 119.278 37.0034 117.942 37.0034 116.548V-19.4146Z"
            fill="#28A9A3"
          />
        </g>
        <g filter="url(#filter2_f_3308_19820)">
          <path
            d="M403.955 -82.6359C403.955 -83.6188 404.797 -84.5614 406.298 -85.2564C407.798 -85.9514 409.833 -86.3418 411.955 -86.3418H819.953C822.075 -86.3418 824.109 -85.9514 825.61 -85.2564C827.11 -84.5614 827.953 -83.6188 827.953 -82.6359V16.9596H411.955C409.833 16.9596 407.798 16.5692 406.298 15.8742C404.797 15.1792 403.955 14.2366 403.955 13.2537V-82.6359Z"
            fill="#EE4FFB"
          />
        </g>
        <g filter="url(#filter3_f_3308_19820)">
          <path
            d="M1586.52 874.836C1586.52 873.443 1587 872.106 1587.85 871.121C1588.69 870.135 1589.84 869.582 1591.03 869.582H1821C1822.19 869.582 1823.34 870.135 1824.18 871.121C1825.03 872.106 1825.51 873.443 1825.51 874.836V1016.05H1591.03C1589.84 1016.05 1588.69 1015.5 1587.85 1014.51C1587 1013.53 1586.52 1012.19 1586.52 1010.8V874.836Z"
            fill="#EE4FFB"
            fill-opacity="0.4"
          />
        </g>
      </g>
      <defs>
        <clipPath
          id="bgblur_0_3308_19820_clip_path"
          transform="translate(616.725 616.725)"
        >
          <path d="M46.2959 0.770508H1751.5C1761.29 0.770508 1769.23 8.70948 1769.23 18.502V951.292C1769.23 955.132 1767.98 958.868 1765.68 961.938L1737.88 998.949C1734.53 1003.41 1729.28 1006.03 1723.7 1006.03H18.502C8.70959 1006.03 0.770673 998.094 0.770508 988.302V55.5117C0.770508 51.6715 2.01815 47.935 4.32422 44.8643L32.1172 7.85449C35.4662 3.395 40.7189 0.770508 46.2959 0.770508Z" />
        </clipPath>
        <filter
          id="filter1_f_3308_19820"
          x="-123.345"
          y="-185.018"
          width="444.042"
          height="467.169"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80.1742"
            result="effect1_foregroundBlur_3308_19820"
          />
        </filter>
        <filter
          id="filter2_f_3308_19820"
          x="243.606"
          y="-246.69"
          width="744.695"
          height="423.998"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80.1742"
            result="effect1_foregroundBlur_3308_19820"
          />
        </filter>
        <filter
          id="filter3_f_3308_19820"
          x="1426.18"
          y="709.233"
          width="559.678"
          height="467.169"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80.1742"
            result="effect1_foregroundBlur_3308_19820"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3308_19820"
          x1="885"
          y1="0"
          x2="885"
          y2="1006.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#11042F" />
          <stop offset="1" stop-color="#020106" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3308_19820"
          x1="-7.97186e-05"
          y1="4.69154"
          x2="1056.5"
          y2="867.541"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EE4FFB" stop-opacity="0.2" />
          <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3308_19820"
          x1="885"
          y1="3.08362"
          x2="885"
          y2="1006.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#110F0F" />
          <stop offset="1" stop-color="#0A0A0A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const LeftCurveSvg = () => {
  return (
    <svg
      //   width="566"
      //   height="576"
      viewBox="0 0 566 576"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="none" // <— important
    >
      {/* <foreignObject x="0" y="0" width="0" height="0">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style="backdrop-filter:blur(308.43px);clip-path:url(#bgblur_0_572_6135_clip_path);height:100%;width:100%"
              ></div>
            </foreignObject> */}
      <path
        data-figma-bg-blur-radius="616.859"
        d="M15.4219 574.45H550.547C558.638 574.45 565.197 567.891 565.197 559.8V15.4216C565.197 7.33045 558.638 0.77124 550.547 0.77124H379.165C376.419 0.77124 373.729 1.54259 371.4 2.9978L354.227 13.7312C351.653 15.3395 348.679 16.1921 345.645 16.1921H220.323C217.289 16.1921 214.315 15.3396 211.741 13.7312L194.568 2.9978C192.24 1.54256 189.549 0.771257 186.804 0.77124H15.4219C7.33067 0.77124 0.771484 7.33046 0.771484 15.4216V559.8C0.771484 567.891 7.33068 574.45 15.4219 574.45Z"
        fill="url(#paint0_linear_572_6135)"
        stroke="url(#paint1_linear_572_6135)"
        stroke-width="1.54215"
      />
      <defs>
        <clipPath id="bgblur_0_572_6135_clip_path" transform="translate(0 0)">
          <path d="M15.4219 574.45H550.547C558.638 574.45 565.197 567.891 565.197 559.8V15.4216C565.197 7.33045 558.638 0.77124 550.547 0.77124H379.165C376.419 0.77124 373.729 1.54259 371.4 2.9978L354.227 13.7312C351.653 15.3395 348.679 16.1921 345.645 16.1921H220.323C217.289 16.1921 214.315 15.3396 211.741 13.7312L194.568 2.9978C192.24 1.54256 189.549 0.771257 186.804 0.77124H15.4219C7.33067 0.77124 0.771484 7.33046 0.771484 15.4216V559.8C0.771484 567.891 7.33068 574.45 15.4219 574.45Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_572_6135"
          x1="282.984"
          y1="-0.000102583"
          x2="282.984"
          y2="348.526"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#11042F" />
          <stop offset="1" stop-color="#140831" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_572_6135"
          x1="-4.61274e-05"
          y1="346.901"
          x2="358.901"
          y2="76.1507"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8153EA" stop-opacity="0.2" />
          <stop offset="1" stop-color="#F8DBCE" stop-opacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const RightBoxSvg2 = () => {
  return (
    <svg
      // width="693"
      // height="607"
      viewBox="0 0 693 607"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="none" // <— important
    >
      <path
        d="M681.998 0.5C687.797 0.5 692.498 5.20101 692.498 11V570.667C692.498 572.939 691.761 575.149 690.398 576.967L671.398 602.3C669.415 604.944 666.303 606.5 662.998 606.5H11.3922C5.59643 606.5 0.896516 601.804 0.892212 596.008L0.499634 36.3379C0.498038 34.0635 1.23557 31.8498 2.60022 30.0303L21.5983 4.7002C23.5812 2.05632 26.6928 0.500034 29.9977 0.5H681.998Z"
        fill="url(#paint0_linear_3308_19400)"
        stroke="url(#paint1_linear_3308_19400)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3308_19400"
          x1="-174.002"
          y1="20"
          x2="-174.002"
          y2="671"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#110F0F" />
          <stop offset="1" stop-color="#0A0A0A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3308_19400"
          x1="346.498"
          y1="1"
          x2="346.498"
          y2="606"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EE4FFB" />
          <stop offset="1" stop-color="#10FAEE" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
