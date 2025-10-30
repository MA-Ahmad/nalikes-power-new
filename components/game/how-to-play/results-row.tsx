import { HexagonPolygon } from './hexagon-polygon'

interface ResultsRowProps {
  matchNumber: number
  prizeRange: string
  values: (string | number)[]
  isMegaJackpot?: boolean
}

export function ResultsRow({
  matchNumber,
  prizeRange,
  values,
  isMegaJackpot = false,
}: ResultsRowProps) {
  return (
    <div
      className="rounded-2xl p-2 flex items-center gap-2 backdrop-blur-sm"
      //   style={{
      //     background: isMegaJackpot
      //       ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(59, 38, 114, 0.5) 100%)'
      //       : 'linear-gradient(135deg, rgba(59, 38, 114, 0.3) 0%, rgba(29, 18, 66, 0.5) 100%)',
      //     borderColor: isMegaJackpot
      //       ? 'rgba(238, 79, 251, 0.5)'
      //       : 'rgba(147, 51, 234, 0.3)',
      //     boxShadow: `
      //       0 0 20px rgba(147, 51, 234, 0.2),
      //       inset 0 12.33px 24.67px rgba(61, 46, 153, 0.3)
      //     `,
      //   }}

      style={{
        background: 'linear-gradient(180deg, #11042F 0%, #140831 100%)',
        borderImage:
          'linear-gradient(135deg, rgba(129, 83, 234, 0.2) 0%, rgba(248, 219, 206, 0.05) 100%) 1',
        boxShadow: `
            inset 0 12.33px 24.67px rgba(61, 46, 153, 0.48)
          `,
      }}
    >
      {/* Hexagon values */}
      <div className="flex gap-0 flex-shrink-0">
        {values.map((value, idx) => (
          <HexagonPolygon key={idx} value={value} isHighlight={isMegaJackpot} />
        ))}
      </div>

      {/* Prize text */}
      <div className="flex-1">
        {isMegaJackpot ? (
          <h3
            className="text-2xl font-bold text-pink-300"
            style={{ textShadow: '0 0 10px rgba(238, 79, 251, 0.6)' }}
          >
            MEGA JACKPOT
          </h3>
        ) : (
          <p className="text-white text-lg font-semibold">
            Match {matchNumber}: <span>{prizeRange}</span>
          </p>
        )}
      </div>
    </div>
  )
}
