'use client'

interface OutlinedTextProps {
  text: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
  outlineColor?: string
  outlineWidth?: number
}

export function OutlinedText({
  text,
  size = 'md',
  color = '#FDC61C',
  outlineColor = '#B8860B',
  outlineWidth = 3,
}: OutlinedTextProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-5xl',
    lg: 'text-7xl',
  }

  return (
    <div className="flex items-center justify-center">
      <span
        className={`${sizeClasses[size]} font-black tracking-wider`}
        style={{
          color: color,
          WebkitTextStroke: `${outlineWidth}px ${outlineColor}`,
          textShadow: `
                  0 0 10px rgba(253, 198, 28, 0.8),
                  0 0 20px rgba(253, 198, 28, 0.6),
                  0 0 30px rgba(253, 198, 28, 0.4)
                `,
          fontWeight: 900,
          letterSpacing: '0.05em',
        }}
      >
        {text}
      </span>
    </div>
  )
}
