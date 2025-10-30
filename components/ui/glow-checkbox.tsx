'use client'

import { useState } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlowCheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-8',
}

function GlowCheckbox({ className, size = 'md', ...props }: GlowCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <CheckboxPrimitive.Root
      checked={isChecked}
      //   @ts-ignore
      onCheckedChange={setIsChecked}
      className={cn(
        'peer shrink-0 rounded-md border-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        isChecked
          ? 'border-[#EE4FFB] bg-[#EE4FFB]/30 focus-visible:ring-[#EE4FFB]/50'
          : 'border-[#6C7793] bg-white/10 focus-visible:ring-[#6C7793]/50',
        sizeClasses[size],
        className
      )}
      style={{
        boxShadow: isChecked
          ? `
            0 0 11.4px rgba(238, 79, 251, 0.43),
            inset 0 11.4px 11.4px rgba(0, 0, 0, 0.25)
          `
          : `
            inset 0 10.6186px 5.30929px rgba(0, 0, 0, 0.25)
          `,
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          'flex items-center justify-center transition-colors',
          isChecked ? 'text-[#EE4FFB]' : 'text-[#6C7793]'
        )}
      >
        <CheckIcon className="size-full" strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { GlowCheckbox }
