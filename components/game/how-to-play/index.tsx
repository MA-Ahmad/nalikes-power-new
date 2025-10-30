import { ResultsRow } from './results-row'
import { StepCard } from './step-card'
import { Zap, Clock, Flame, ArrowLeft } from 'lucide-react'

export const HowToPlay = ({
  setScreen,
}: {
  setScreen: (screen: string) => void
}) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between text-white z-10 p-[0.975rem] px-6">
      <div className="mt-6 flex flex-col gap-4 mx-10 mb-1 overflow-hidden">
        {/* Header */}
        {/* <h1 className="text-4xl font-bold text-white text-center mb-12">
            Lottery Game
          </h1> */}

        {/* Step Cards Section */}
        <section className="space-y-4">
          <div
            className="flex items-center gap-2 mb-10 w-full cursor-pointer"
            onClick={() => setScreen('jackpot')}
          >
            <ArrowLeft className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white uppercase">Go Back</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step={1}
              title="Create Ticket"
              description="Create a ticket with 7 characters. You can repeat characters or choose luck dip to get a random string."
              icon={Zap}
            />
            <StepCard
              step={2}
              title="Check Draw"
              description="Check when the next block draw happens and get ready to see if you've won."
              icon={Clock}
            />
            <StepCard
              step={3}
              title="Reveal Results"
              description="Now it's your turn to reveal the results and find out if your entry hits the jackpot."
              icon={Flame}
            />
          </div>
        </section>

        {/* Results Section */}
        <section className="space-y-4 max-h-[18rem] overflow-y-scroll pb-2">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Results & Wins
          </h2>
          <div className="space-y-4 ">
            <ResultsRow
              matchNumber={3}
              prizeRange="$200 - $3,000"
              values={['1', '3', 'C', 'E', '9', 'F', '+', '3']}
            />
            <ResultsRow
              matchNumber={4}
              prizeRange="$5,000 - $30,00"
              values={['1', '3', 'C', 'E', '9', 'F', '+', '3']}
            />
            <ResultsRow
              matchNumber={5}
              prizeRange="$50,000 - $100,000"
              values={['1', '3', 'C', 'E', '9', 'F', '+', '3']}
            />
            <ResultsRow
              matchNumber={6}
              prizeRange="$100,000 - $300,000"
              values={['1', '3', 'C', 'E', '9', 'F', '+', '3']}
            />
            <ResultsRow
              matchNumber={7}
              prizeRange=""
              values={['1', '3', 'C', 'E', '9', 'F', '+', '3']}
              isMegaJackpot={true}
            />
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
