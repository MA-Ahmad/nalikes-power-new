import { cn } from '@/lib/utils'

interface PrizeCardProps {
  image: string
  amount: string
  text?: string
  off?: string
  className?: string
  isSelected?: boolean
  scaleImage?: boolean
  allowAnimation?: boolean
}

export const PrizeCard = ({
  image,
  amount,
  text,
  off,
  className,
  isSelected,
  scaleImage,
  allowAnimation,
}: PrizeCardProps) => {
  return (
    <div
      className={cn(
        'prize-card flex-shrink-0 w-32 h-40 sm:w-36 sm:h-44 md:w-40 md:h-48 group',
        'bg-gradient-card rounded-[15px]',
        'shadow-card backdrop-blur-sm relative overflow-hidden',
        className,
        isSelected && 'outline-solid outline-10 outline-black',
        allowAnimation && 'hover:-translate-y-1.5 transition-all duration-300'
      )}
    >
      {off && (
        <div className="absolute top-2 right-2">
          <p className="text-sm font-bold text-foreground">{off}</p>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-evenly h-full p-4 space-y-3">
        {/* Prize Image */}

        <div className="w-24 h-24 flex items-center justify-center">
          <img
            src={image}
            alt="Prize"
            className={cn(
              'w-full h-full object-contain filter drop-shadow-lg',
              scaleImage && 'group-hover:scale-110 transition-all duration-300'
            )}
          />
        </div>

        {text && (
          <div className="text-center">
            <div className="text-lg font-bold text-foreground leading-none">
              {text}
            </div>
          </div>
        )}

        <div className="card-line w-full" />

        {/* Amount Text */}
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">$ {amount}</div>
        </div>
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-lg ring-1 ring-gaming-glow/20" />
    </div>
  )
}
