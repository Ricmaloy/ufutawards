import { Check } from 'lucide-react'

export function Checkmark() {
  return (
    <div className="absolute -right-6 -top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-ocean-700">
      <Check className="text-white" />
    </div>
  )
}
