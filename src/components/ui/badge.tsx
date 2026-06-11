import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#C8102E]/10 text-[#C8102E]',
        oro: 'bg-[#C9922A]/10 text-[#C9922A]',
        muted: 'bg-[#1F1F1F] text-[#6B6560] border border-white/[0.07]',
        success: 'bg-emerald-500/10 text-emerald-400',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
