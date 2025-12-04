'use client'

import { motion } from 'framer-motion'

interface AnimatedCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function AnimatedCheckbox({
  checked,
  onChange,
  className,
}: AnimatedCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={className}
      aria-label="Toggle checkbox"
    >
      <div className="relative w-4 h-4" style={{ overflow: 'visible' }}>
        {/* Small checkbox box */}
        <div
          className={`absolute inset-0 border rounded-sm transition-colors ${
            checked
              ? 'border-[#ffffff]/50'
              : 'border-[#ffffff]/60 bg-transparent'
          }`}
        />

        {/* SVG positioned to extend upward and outward from box */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          className="absolute"
          style={{
            top: '-10px',
            left: '-7px',
            width: '30px',
            height: '30px',
            pointerEvents: 'none',
          }}
        >
          {/* Left line of checkmark */}
          <motion.line
            x1="6"
            y1="14"
            x2="10"
            y2="18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              checked
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          />

          {/* Right line of checkmark */}
          <motion.line
            x1="10"
            y1="18"
            x2="22"
            y2="6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              checked
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
              delay: checked ? 0.15 : 0,
            }}
          />
        </svg>
      </div>
    </button>
  )
}
