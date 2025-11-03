'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import JackpotRightBox from './jackpot/jackpot-screen'
import { ButtonDarkPurple, ButtonLightPurple, ButtonPink } from './buttons'
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { FireGlowBox, GlowBox, GrayGlowBox } from '../ui/glow-box'
import { OutlinedText } from '../ui/outlined-text'
import { FireIcon } from '../icons'
import { TicketContent, TicketSvg } from './tickets'
import { useState } from 'react'
import { HowToPlay } from './how-to-play'
import { GlowCheckbox } from '../ui/glow-checkbox'
import TicketBoughtScreen from './ticket-bough-screen'
import JackpotDrawBox from './jackpot/jackpot-draw-box'

export default function BitcoinGame() {
  const [screen, setScreen] = useState('jackpot')
  const [tickets, setTickets] = useState<any[]>([])

  return (
    <div className="relative w-full h-full max-w-[1450px] mx-auto">
      <div
        className="flex items-center gap-2 mb-10 w-full cursor-pointer absolute -top-[1.8rem]"
        onClick={() => {
          if (screen === 'reveal') setScreen('reveal-screen')
          else if (screen === 'ticket-bought') setScreen('draws')
          else setScreen('jackpot')
        }}
      >
        <ArrowLeft className="w-6 h-6" />
        <h2 className="text-xl font-bold text-white uppercase">Go Back</h2>
      </div>

      <SvgContainer />

      <div className="relative flex gap-2 justify-center items-center w-full h-full max-w-[1450px] mx-auto p-6">
        {screen !== 'ticket-bought' && (
          <div className="relative basis-1/3 h-full">
            <TicketSvg />

            <div className="relative h-full">
              <TicketContent
                setScreen={setScreen}
                tickets={tickets}
                setTickets={setTickets}
              />
            </div>
          </div>
        )}

        {screen === 'draws' && (
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
        )}

        <div className="relative h-full basis-2/3 overflow-hidden">
          <RightBoxSvg />
          {(screen === 'jackpot' || screen === 'reveal') && (
            <Image
              src="/images/green-mask.svg"
              alt="Green Mask"
              width={200}
              height={220}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {screen === 'ticket-bought' && (
            <Image
              src="/images/city-mask.svg"
              alt="Green Mask"
              width={200}
              height={220}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {screen === 'reveal-screen' && (
            <Image
              src="/images/dog-mask.svg"
              alt="Green Mask"
              width={200}
              height={220}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}

          {screen === 'jackpot' && <JackpotRightBox setScreen={setScreen} />}
          {screen === 'how-to-play' && <HowToPlay setScreen={setScreen} />}
          {screen === 'draws' && <JackpotDrawBox />}
          {screen === 'ticket-bought' && (
            <TicketBoughtScreen setScreen={setScreen} />
          )}
          {screen === 'tickets' && (
            <MyTickets tickets={tickets} setTickets={setTickets} />
          )}

          {screen === 'reveal-screen' && (
            <RevealResults setScreen={setScreen} />
          )}
          {screen === 'reveal' && <GameWrapper />}
        </div>
      </div>
    </div>
  )
}

const MyTickets = ({
  tickets,
  setTickets,
}: {
  tickets: any[]
  setTickets: (tickets: any[]) => void
}) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between text-white z-10 p-[0.975rem] px-6">
      <div className="mt-2 flex flex-col gap-4 mx-10 mb-1 overflow-hidden">
        {/* Step Cards Section */}
        {/* <section className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white uppercase">
                Go Back
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold text-white uppercase">
                My Tickets{' '}
              </h2>
            </div>
            <div className="w-10" />
          </div>
          <div className="w-full h-[1px] bg-white/10 px-20" />
        </section> */}

        <section className="space-y-4 mb-4">
          <div className="flex items-center justify-center gap-4 py-4">
            <ButtonDarkPurple>
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Current Event
              </span>
            </ButtonDarkPurple>
            <ButtonLightPurple>
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Events History
              </span>
            </ButtonLightPurple>
          </div>
          <div className="w-full h-[1px] bg-white/10 px-20" />
        </section>

        {/* Results Section */}
        <section
          className="rounded-2xl p-2 flex items-center gap-2 backdrop-blur-sm h-full pb-5"
          style={{
            background: 'linear-gradient(180deg, #11042F 0%, #140831 100%)',
            borderImage:
              'linear-gradient(135deg, rgba(129, 83, 234, 0.2) 0%, rgba(248, 219, 206, 0.05) 100%) 1',
            boxShadow: `
            inset 0 12.33px 24.67px rgba(61, 46, 153, 0.48)
          `,
          }}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center w-full p-4">
              <div className="text-[#B19CCE] flex items-center gap-2 basis-[15%]">
                Date
                <ArrowUp className="w-4 h-4 text-[#B19CCE]" />
              </div>
              <div className="text-[#B19CCE] flex items-center gap-2 basis-[50%]">
                Ticket
                <ArrowUp className="w-4 h-4 text-[#B19CCE]" />
              </div>
              <div className="text-[#B19CCE] flex items-center gap-2 basis-1/5">
                Event
                <ArrowUp className="w-4 h-4 text-[#B19CCE]" />
              </div>
              <div className="text-[#B19CCE] flex items-center gap-2 basis-[15%]">
                Result
                <ArrowUp className="w-4 h-4 text-[#B19CCE]" />
              </div>
              <div className="text-[#B19CCE] flex items-center gap-2 basis-1/5">
                Prize Value
                <ArrowUp className="w-4 h-4 text-[#B19CCE]" />
              </div>
            </div>
            {/* Want to scroll this part only */}
            <div className="flex flex-col gap-2 max-h-[370px] overflow-y-auto">
              {tickets.map((ticket, index) => (
                <div
                  className={cn(
                    'flex items-center p-4 rounded-xl',
                    index % 2 === 0 ? 'bg-[#261d45]' : ''
                  )}
                >
                  <div className="flex items-center gap-2 basis-[15%]">
                    29 April
                  </div>
                  <div className="flex items-center gap-1 basis-[50%]">
                    {ticket.data.map((item: any) => (
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-[#6C7793] flex items-center justify-center">
                        {item}
                      </div>
                    ))}{' '}
                    +
                    <div
                      className={`
        w-8 h-8
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
                  <div className="flex items-center gap-2 basis-1/5">
                    0x234..234
                  </div>
                  <div className="flex items-center gap-2 basis-[15%]">WIN</div>
                  <div className="flex items-center gap-2 basis-1/5">
                    $1465
                    <Image
                      src="/images/bitcoin.svg"
                      alt="Bitcoin"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <div className="w-full h-[1px] bg-white/10 px-20" />
          <div className="flex items-center w-full justify-between gap-2">
            <span className="text-sm font-aeonik-bold text-neutral-400">
              VERIFY FAIRNESS
            </span>

            <span className="text-sm font-aeonik-bold text-neutral-400">
              POWERED BY
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const GameWrapper = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between text-white z-10 p-[0.975rem] px-6">
      <div className="z-10 p-[0.975rem] px-6 mt-12 w-full">
        <div className="flex items-center justify-center gap-2">
          <GlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                D
              </p>
            </div>
          </GlowBox>
          <GlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                6
              </p>
            </div>
          </GlowBox>
          <GlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                4
              </p>
            </div>
          </GlowBox>
          <FireGlowBox size="md">
            <div className="text-center">
              <p className="text-white text-6xl font-semibold font-aenoik-bold">
                F
              </p>
            </div>
          </FireGlowBox>
        </div>

        <div className="flex items-start justify-between mt-16">
          <div className="flex flex-col justify-between h-full basis-1/3">
            <div className="flex items-center gap-2">
              <GlowBox size="sm">
                <div className="text-center">
                  <p className="text-white text-5xl font-semibold font-aenoik-bold">
                    D
                  </p>
                </div>
              </GlowBox>
              <GlowBox size="sm">
                <div className="text-center">
                  <p className="text-white text-5xl font-semibold font-aenoik-bold">
                    D
                  </p>
                </div>
              </GlowBox>
              <GlowBox size="sm">
                <div className="text-center">
                  <p className="text-white text-5xl font-semibold font-aenoik-bold">
                    D
                  </p>
                </div>
              </GlowBox>
              <GrayGlowBox size="xs">
                <div className="text-center">
                  <p className="text-white text-4xl font-semibold font-aenoik-bold">
                    D
                  </p>
                </div>
              </GrayGlowBox>
              <GrayGlowBox size="xs">
                <div className="text-center">
                  <p className="text-white text-4xl font-semibold font-aenoik-bold">
                    6
                  </p>
                </div>
              </GrayGlowBox>
              <GrayGlowBox size="xs">
                <div className="text-center">
                  <p className="text-white text-4xl font-semibold font-aenoik-bold">
                    4
                  </p>
                </div>
              </GrayGlowBox>
              <GrayGlowBox size="xs">
                <div className="text-center">
                  <p className="text-white text-4xl font-semibold font-aenoik-bold">
                    4
                  </p>
                </div>
              </GrayGlowBox>
            </div>

            <div className="bg-[#FAD60F] w-full h-[2px] mt-2" />
            {/* <div className="bg-[#FAD60F] w-full h-[5px] w-[1px] flex items-center mt-5" /> */}
            {/* <div className="w-full flex items-center">
              <div className="bg-[#FAD60F] w-[4px] h-10 mt-5" />
            </div> */}
            <div className="w-full flex items-center justify-center">
              <div className="bg-[#FAD60F] w-[2px] h-4" />
            </div>
            <p className="flex items-center justify-center text-[#FAD60F] font-bold">
              3 Match!
            </p>

            <div className="mt-2">
              <OutlinedText text="+ $60" size="lg" outlineColor="#fff085" />
              <div className="flex items-center gap-2 mt-12">
                <p className="text-lg font-bold">Total Wins</p>
                <OutlinedText text="$20" size="md" outlineColor="#fff085" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#11042F] to-[#140831] min-w-[15rem] py-6 px-8 rounded-xl">
            <p className="mb-4">My Tickets</p>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.0002 53.3334H49.8724C54.7314 53.3334 58.6668 49.447 58.6668 44.6483V37.735C55.4516 37.735 52.8623 35.1779 52.8623 32.0028C52.8623 28.8278 55.4516 26.2678 58.6668 26.2678L58.6642 19.3517C58.6642 14.5533 54.7258 10.6667 49.8698 10.6667H14.1306C9.27454 10.6667 5.33627 14.5533 5.33627 19.3517L5.3335 26.493C8.54862 26.493 11.138 28.8278 11.138 32.0028C11.138 35.1779 8.54862 37.735 5.3335 37.735V44.6483C5.3335 49.447 9.26896 53.3334 14.1278 53.3334H16.3973"
                    fill="#EE4FFB"
                  />
                  <path
                    d="M36.9323 11.334V17.7873"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.9323 47.3601V52.7574"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.9323 38.199V25.343"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M28 53.3334H49.8723C54.7312 53.3334 58.6667 49.447 58.6667 44.6483V37.735C55.4515 37.735 52.8621 35.178 52.8621 32.0027C52.8621 28.8278 55.4515 26.2678 58.6667 26.2678L58.664 19.3517C58.664 14.5533 54.7256 10.6667 49.8696 10.6667H14.1305C9.27438 10.6667 5.33611 14.5533 5.33611 19.3517L5.33334 26.493C8.54846 26.493 11.1378 28.8278 11.1378 32.0027C11.1378 35.178 8.54846 37.735 5.33334 37.735V44.6483C5.33334 49.447 9.2688 53.3334 14.1277 53.3334H16.3972"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-[#EE4FFB]">Winner</p>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.0002 53.3334H49.8724C54.7314 53.3334 58.6668 49.447 58.6668 44.6483V37.735C55.4516 37.735 52.8623 35.1779 52.8623 32.0028C52.8623 28.8278 55.4516 26.2678 58.6668 26.2678L58.6642 19.3517C58.6642 14.5533 54.7258 10.6667 49.8698 10.6667H14.1306C9.27454 10.6667 5.33627 14.5533 5.33627 19.3517L5.3335 26.493C8.54862 26.493 11.138 28.8278 11.138 32.0028C11.138 35.1779 8.54862 37.735 5.3335 37.735V44.6483C5.3335 49.447 9.26896 53.3334 14.1278 53.3334H16.3973"
                    fill="#EE4FFB"
                  />
                  <path
                    d="M36.9323 11.334V17.7873"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.9323 47.3601V52.7574"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.9323 38.199V25.343"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M28 53.3334H49.8723C54.7312 53.3334 58.6667 49.447 58.6667 44.6483V37.735C55.4515 37.735 52.8621 35.178 52.8621 32.0027C52.8621 28.8278 55.4515 26.2678 58.6667 26.2678L58.664 19.3517C58.664 14.5533 54.7256 10.6667 49.8696 10.6667H14.1305C9.27438 10.6667 5.33611 14.5533 5.33611 19.3517L5.33334 26.493C8.54846 26.493 11.1378 28.8278 11.1378 32.0027C11.1378 35.178 8.54846 37.735 5.33334 37.735V44.6483C5.33334 49.447 9.2688 53.3334 14.1277 53.3334H16.3972"
                    stroke="#EE4FFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-[#EE4FFB]">Winner</p>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.0002 53.3334H49.8724C54.7314 53.3334 58.6668 49.447 58.6668 44.6483V37.735C55.4516 37.735 52.8623 35.1779 52.8623 32.0028C52.8623 28.8278 55.4516 26.2678 58.6668 26.2678L58.6642 19.3517C58.6642 14.5533 54.7258 10.6667 49.8698 10.6667H14.1306C9.27454 10.6667 5.33627 14.5533 5.33627 19.3517L5.3335 26.493C8.54862 26.493 11.138 28.8278 11.138 32.0028C11.138 35.1779 8.54862 37.735 5.3335 37.735V44.6483C5.3335 49.447 9.26896 53.3334 14.1278 53.3334H16.3973"
                    fill="url(#paint0_linear_3308_19672)"
                    fill-opacity="0.3"
                  />
                  <path
                    d="M36.9323 11.334V17.7873"
                    stroke="#A5A9C1"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.9323 47.3599V52.7572"
                    stroke="#A5A9C1"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.9323 38.1993V25.3433"
                    stroke="#A5A9C1"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M28 53.3334H49.8723C54.7312 53.3334 58.6667 49.447 58.6667 44.6483V37.735C55.4515 37.735 52.8621 35.178 52.8621 32.0027C52.8621 28.8278 55.4515 26.2678 58.6667 26.2678L58.664 19.3517C58.664 14.5533 54.7256 10.6667 49.8696 10.6667H14.1305C9.27438 10.6667 5.33611 14.5533 5.33611 19.3517L5.33334 26.493C8.54846 26.493 11.1378 28.8278 11.1378 32.0027C11.1378 35.178 8.54846 37.735 5.33334 37.735V44.6483C5.33334 49.447 9.2688 53.3334 14.1277 53.3334H16.3972"
                    stroke="#A5A9C1"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3308_19672"
                      x1="32.0002"
                      y1="10.6667"
                      x2="32.0002"
                      y2="53.3334"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#A5A9C1" />
                      <stop offset="1" stop-color="#A5A9C1" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-[#A5A9C1]">No Winner</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6 z-10 p-[0.975rem] px-6 mt-6 w-full">
        <div className="w-full h-[1px] bg-white/10 px-20" />
        <div className="flex items-center w-full justify-between gap-2">
          <span className="text-sm font-aeonik-bold text-neutral-400">
            VERIFY FAIRNESS
          </span>

          <span className="text-sm font-aeonik-bold text-neutral-400">
            POWERED BY
          </span>
        </div>
      </div>
    </div>
  )
}

const RevealResults = ({
  setScreen,
}: {
  setScreen: (screen: string) => void
}) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between text-white z-10 p-[0.975rem] px-6">
      <div className="mt-16 flex flex-col gap-4 mx-10 mb-1 overflow-hidden justify-center w-full items-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h3 className="text-3xl font-bold text-white uppercase">
            Reveal Your Results
          </h3>

          <ButtonPink onClick={() => setScreen('reveal')}>
            <div className="flex items-center gap-2">
              <span className="relative text-pink-light font-semibold whitespace-nowrap flex items-center justify-center">
                Reveal Now
              </span>
              <ArrowRight className="w-5 h-5 z-[55] text-pink-light" />
            </div>
          </ButtonPink>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="w-full h-[1px] bg-white/10 px-20" />
        <div className="flex items-center w-full justify-between gap-2">
          <span className="text-sm font-aeonik-bold text-neutral-400">
            VERIFY FAIRNESS
          </span>

          <span className="text-sm font-aeonik-bold text-neutral-400">
            POWERED BY
          </span>
        </div>
      </div>
    </div>
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

const RightBoxSvg = () => {
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
