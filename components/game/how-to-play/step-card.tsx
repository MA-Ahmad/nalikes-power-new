import type { LucideIcon } from 'lucide-react'

interface StepCardProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
}

export function StepCard({
  step,
  title,
  description,
  icon: Icon,
}: StepCardProps) {
  return (
    <div className="relative w-full h-full max-w-sm">
      {/* Card container with correct gradient and inner shadow */}
      <div
        className="rounded-lg p-4 px-4 backdrop-blur-sm h-full"
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
            className="w-12 h-12 rounded-full flex items-center justify-center border bg-[#30244f] shadow-[0_0_20px_6px_rgba(118,80,255,0.6)]"
            style={{
              //   background: 'rgba(255, 255, 255, 0.1)',

              borderColor: '#535979',
              borderWidth: '1.54px',
              //   boxShadow: `
              //       0 0 16.37px #2E0F76,
              //       inset 0 10.62px 5.31px rgba(0, 0, 0, 0.25)
              //     `,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: '#96A3F6' }} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-2 text-left">
          <h3 className="text-xl font-bold text-gray-300 mb-2">STEP {step}</h3>
          <p className="text-white text-base">{description}</p>
        </div>
      </div>
    </div>
  )
}
