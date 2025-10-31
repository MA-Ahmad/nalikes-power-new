import { useEffect, useState } from 'react'
import { FireIcon } from '../icons'
import { GreenGlowBox } from '../ui/glow-box'
import { ButtonDarkPurple, ButtonGreen, ButtonPink, ButtonRed } from './buttons'
import { CurveSvg } from './svgs'
import { ArrowRight, PlusCircle, XIcon } from 'lucide-react'

export const TicketSvg = () => {
  return (
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
          <rect width="615.183" height="932.796" rx="15.4181" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const TicketContent = ({
  setScreen,
}: {
  setScreen: (screen: string) => void
}) => {
  const [showTickets, setShowTickets] = useState(true)
  const [tickets, setTickets] = useState<any[]>([])
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  return (
    <>
      {showTickets && !selectedTicket ? (
        <ShowTickets
          tickets={tickets}
          setSelectedTicket={setSelectedTicket}
          setTickets={setTickets}
          setShowTickets={setShowTickets}
          setScreen={setScreen}
        />
      ) : (
        <CreateTicket
          tickets={tickets}
          setTickets={setTickets}
          setShowTickets={setShowTickets}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        />
      )}
    </>
  )
}

const ShowTickets = ({
  tickets,
  setSelectedTicket,
  setTickets,
  setShowTickets,
  setScreen,
}: {
  tickets: any[]
  setSelectedTicket: (ticket: any) => void
  setTickets: (tickets: any[]) => void
  setShowTickets: (showTickets: boolean) => void
  setScreen: (screen: string) => void
}) => {
  const handleTicketDelete = (ticket: { id: string }) => {
    setTickets(tickets.filter((t) => t.id !== ticket.id))
  }

  const generateRandomTicket = () => {
    const allCharacters = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ]
    const shuffled = [...allCharacters].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 7)
  }

  const handleLuckyDip = (ticket: { id: string }) => {
    const randomData = generateRandomTicket()
    setTickets(
      tickets.map((t) => (t.id === ticket.id ? { ...t, data: randomData } : t))
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col text-white justify-between z-10 p-[0.975rem] px-3">
      <div className="w-full">
        <div className="mt-6 flex flex-col gap-6 items-center justify-center">
          <h2 className="text-3xl font-bold text-white uppercase">
            Create Ticket
          </h2>
          <div className="w-full h-[1px] bg-white/10 px-20 z-[55] mx-10" />
        </div>

        <div className="flex flex-col gap-2 relative mt-6 h-[30rem] overflow-y-scroll">
          {tickets.length > 0 ? (
            <>
              <CurveSvg />

              <div className="flex items-center justify-between pt-6 px-6 z-[55] w-full">
                <div className="flex items-center gap-2 z-[55]">
                  <p className="text-xl font-bold">$2.5</p>
                  <p className="text-[#B9B5D6] text-sm">/line</p>
                </div>
                <div className="flex items-center gap-2">
                  <ButtonPink onClick={() => setScreen('tickets')}>
                    <span className="relative text-pink-light font-semibold whitespace-nowrap flex items-center justify-center">
                      My Tickets
                    </span>
                  </ButtonPink>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          {tickets.map((ticket: { id: string; data: any }, index: number) => (
            <section
              key={ticket.id + 'ticket'}
              className="rounded-2xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm my-4 relative mx-4"
              style={{
                background: 'linear-gradient(180deg, #11042F 0%, #140831 100%)',
                borderImage:
                  'linear-gradient(135deg, rgba(129, 83, 234, 0.2) 0%, rgba(248, 219, 206, 0.05) 100%) 1',
                boxShadow: `
         inset 0 12.33px 24.67px rgba(61, 46, 153, 0.48)
       `,
              }}
            >
              <div className="absolute -top-6 -right-6 -top-[1rem] transform -translate-x-1/2">
                <div
                  className="w-[1.75rem] h-[1.75rem] rounded-full border-[#535979] flex items-center justify-center border bg-[#30244f] hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                  onClick={() => handleTicketDelete(ticket)}
                >
                  <XIcon className="size-5 text-[#535979]" />
                </div>
              </div>

              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border bg-[#30244f] shadow-[0_0_20px_6px_rgba(118,80,255,0.6)]"
                  style={{
                    borderColor: '#535979',
                    borderWidth: '1.54px',
                  }}
                >
                  {index + 1}
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {ticket.data.slice(0, 5).map((item: any, index: number) => (
                  <div
                    key={index + 'ticket-item'}
                    className="w-10 h-10 rounded-lg bg-white/10 border border-[#6C7793]/80 flex items-center justify-center"
                  >
                    {item}
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
                <ButtonDarkPurple onClick={() => setSelectedTicket(ticket)}>
                  <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                    Edit
                  </span>
                </ButtonDarkPurple>
                <ButtonGreen onClick={() => handleLuckyDip(ticket)}>
                  <span className="relative text-[#9CF350] font-semibold whitespace-nowrap flex items-center justify-center">
                    Lucky Dip
                  </span>
                </ButtonGreen>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex w-full items-center justify-center gap-2">
          <ButtonDarkPurple onClick={() => setShowTickets(false)}>
            <div className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5 z-[55] text-purple-base" />
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Add More
              </span>
            </div>
          </ButtonDarkPurple>

          <ButtonDarkPurple onClick={() => setScreen('draws')}>
            <div className="flex items-center gap-2">
              <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
                Proceed
              </span>
              <ArrowRight className="w-5 h-5 z-[55] text-purple-base" />
            </div>
          </ButtonDarkPurple>
        </div>

        <ButtonDarkPurple onClick={() => setScreen('reveal-screen')}>
          <div className="flex items-center gap-2">
            <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
              Reveal
            </span>
          </div>
        </ButtonDarkPurple>
      </div>
    </div>
  )
}

const CreateTicket = ({
  tickets,
  setTickets,
  setShowTickets,
  selectedTicket,
  setSelectedTicket,
}: {
  tickets: any[]
  setTickets: (tickets: any[]) => void
  setShowTickets: (showTickets: boolean) => void
  selectedTicket: any
  setSelectedTicket: (selectedTicket: any) => void
}) => {
  const [ticket, setTicket] = useState<{ id: string; data: any[] }>({
    id: '',
    data: [],
  })

  useEffect(() => {
    if (selectedTicket) {
      setTicket(selectedTicket)
    } else {
      setTicket({ id: '', data: [] })
    }
  }, [selectedTicket])

  const handleTicketChange = (item: any) => {
    if (selectedTicket) {
      // Edit mode
      if (ticket.data.includes(item)) {
        setTicket({
          ...ticket,
          data: ticket.data.filter((i) => i !== item),
        })
      } else {
        if (ticket.data.length < 7) {
          setTicket({
            ...ticket,
            data: [...ticket.data, item],
          })
        }
      }
    } else {
      // Create mode
      if (ticket.data.includes(item)) {
        setTicket({
          ...ticket,
          data: ticket.data.filter((i) => i !== item),
        })
      } else {
        if (ticket.data.length < 7) {
          const newId = ticket.id || crypto.randomUUID()
          setTicket({
            id: newId,
            data: [...ticket.data, item],
          })
        }
      }
    }
  }

  const handleTicketSubmit = () => {
    if (ticket.data.length >= 7) {
      if (selectedTicket) {
        // Update existing ticket
        setTickets(tickets.map((t) => (t.id === ticket.id ? ticket : t)))
      } else {
        // Add new ticket
        const newTicket = {
          id: ticket.id || crypto.randomUUID(),
          data: ticket.data,
        }
        setTickets([...tickets, newTicket])
      }
      setTicket({ id: '', data: [] })
      setSelectedTicket(null)
      setShowTickets(true)
    }
  }

  const handleClear = () => {
    setTicket({ id: '', data: [] })
  }

  const generateRandomTicket = () => {
    const allCharacters = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ]
    const shuffled = [...allCharacters].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 7)
  }

  const handleLuckyDip = () => {
    const randomData = generateRandomTicket()
    const newId = selectedTicket ? ticket.id : ticket.id || crypto.randomUUID()
    setTicket({
      id: newId,
      data: randomData,
    })
  }

  console.log('ticket ===>', ticket)

  const isSelected0 = ticket.data.includes(0)

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
              {ticket.data.map((item: any, index: number) => (
                <span key={index + 'TT'} className="flex justify-center">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-start justify-between w-full gap-4">
              {/* Left side: Digits grid */}
              <div className="grid grid-cols-3 gap-2 basis-[40%] justify-items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                  const isSelected = ticket.data.includes(item)
                  if (isSelected)
                    return (
                      <GreenGlowBox
                        key={item + 'D'}
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
              <div className="grid grid-cols-3 gap-2 basis-[40%] justify-items-center cursor-pointer">
                {['A', 'B', 'C', 'D', 'E', 'F'].map((item) => {
                  const isSelected = ticket.data.includes(item)
                  if (isSelected)
                    return (
                      <GreenGlowBox
                        key={item + 'C'}
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
        <ButtonGreen onClick={() => handleLuckyDip()}>
          <span className="relative text-[#9CF350] font-semibold whitespace-nowrap flex items-center justify-center">
            Lucky Dip
          </span>
        </ButtonGreen>
        <div className="flex items-center gap-4">
          <ButtonRed onClick={() => handleClear()}>
            <span className="relative text-[#F35050] font-semibold whitespace-nowrap flex items-center justify-center">
              Clear
            </span>
          </ButtonRed>
          <ButtonDarkPurple onClick={() => handleTicketSubmit()}>
            <span className="relative text-purple-base font-semibold whitespace-nowrap flex items-center justify-center">
              Save
            </span>
          </ButtonDarkPurple>
        </div>
      </div>
    </div>
  )
}
