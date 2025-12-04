import Image from 'next/image'
import Icon from '@/assets/icon.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card'
import Link from 'next/link'
import { Check, Sailboat } from 'lucide-react'

export type CategoryCardProps = {
  title: string
  description: string
  nominees: number
  slug: string
  voted?: boolean
  disabled?: boolean
}

export function CategoryCard({
  title,
  description,
  nominees,
  slug,
  voted = false,
  disabled = false,
}: CategoryCardProps) {
  return (
    <Link
      href={`category/${slug}`}
      className={`${disabled && 'pointer-events-none'}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    >
      <Card className="h-72 flex flex-col justify-end relative bg-neutral-100 border border-neutral-200 ">
        {voted && (
          <div className="size-10 flex justify-center items-center rounded-full -top-4 -right-3 absolute bg-blue-700">
            <Check className="text-white" />
          </div>
        )}
        <CardHeader className="absolute top-1 left-1">
          <Sailboat className="text-neutral-950" />
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <CardTitle className="text-neutral-950 font-bold text-base">
            {title}
          </CardTitle>
          <CardDescription className="text-neutral-700">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="text-neutral-600 text-xs">
          {nominees} indicados
        </CardFooter>
      </Card>
    </Link>
  )
}
