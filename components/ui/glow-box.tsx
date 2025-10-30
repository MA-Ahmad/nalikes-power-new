import type React from 'react'
import { Flame } from 'lucide-react'

interface GlowBoxProps {
  children?: React.ReactNode
  className?: string
  size?: 'xss' | 'xs' | 'sm' | 'md' | 'lg'
}

export function GlowBox({
  children,
  className = '',
  size = 'md',
}: GlowBoxProps) {
  const sizeClasses = {
    xss: 'w-10 h-10',
    xs: 'w-16 h-16',
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-lg
        bg-[#12052F]
        border border-[#6F6BFF]
        flex items-center justify-center
        ${className}
      `}
      style={{
        boxShadow: `
          0 0 10.62px rgba(111, 107, 255, 0.43),
          inset 0 12.33px 24.67px rgba(111, 107, 255, 1),
          inset 0 10.62px 21.24px rgba(111, 107, 255, 0.25)
        `,
      }}
    >
      {children}
    </div>
  )
}

export function GrayGlowBox({
  children,
  className = '',
  size = 'md',
}: GlowBoxProps) {
  const sizeClasses = {
    xss: 'w-10 h-10',
    xs: 'w-16 h-16',
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  return (
    <div
      className={`
      ${sizeClasses[size]}
      rounded-lg
      bg-[#12052F]
      border border-[#777783]
      flex items-center justify-center
      ${className}
    `}
      style={{
        boxShadow: `
        0 0 4.49px rgba(70, 70, 82, 0.43),
        inset 0 5.22px 10.44px rgba(119, 119, 131, 1),
        inset 0 4.49px 8.98px rgba(119, 119, 131, 0.25)
      `,
      }}
    >
      {children}
    </div>
  )
}

interface FireGlowBoxProps {
  children?: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export function FireGlowBox({
  children,
  className = '',
  size = 'md',
  showIcon = true,
}: FireGlowBoxProps) {
  const sizeClasses = {
    xs: 'w-16 h-16',
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  const iconSizes = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-lg
        bg-[#300333]
        border border-[#EE4FFB]
        flex items-center justify-center
        backdrop-blur-[17.62px]
        ${className}
      `}
      style={{
        boxShadow: `
          inset 0 12.33px 24.67px rgba(238, 79, 251, 0.25),
          inset 0 12.33px 12.33px rgba(238, 79, 251, 0.24),
          inset 0 3.08px 1.54px rgba(238, 79, 251, 1)
        `,
      }}
    >
      {children ||
        (showIcon && (
          <Flame
            size={iconSizes[size]}
            className="text-[#EE4FFB]"
            strokeWidth={2.5}
          />
        ))}
    </div>
  )
}

export function GreenGlowBox({
  children,
  className = '',
  size = 'md',
  onClick,
}: GlowBoxProps & { onClick?: () => void }) {
  const sizeClasses = {
    xss: 'w-10 h-10',
    xs: 'w-16 h-16',
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-lg
        bg-[#1D2B18]
        border border-[#61E861]
        flex items-center justify-center
        ${className}
      `}
      style={{
        boxShadow: `
          inset 0 12.34px 24.67px rgba(97, 232, 97, 0.25),
          inset 0 12.34px 12.34px rgba(97, 232, 97, 0.24)
        `,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
