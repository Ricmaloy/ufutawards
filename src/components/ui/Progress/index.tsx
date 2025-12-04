import { Progress as ProgressBar } from '@/components/ui/progress-primitive'
import { Separator } from '../separator'

export type ProgressProps = {
  totalCategories: number
  votedCategories: number
}

export function Progress({ totalCategories, votedCategories }: ProgressProps) {
  const progress = Math.ceil((votedCategories * 100) / totalCategories)

  return (
    <>
      <div className="my-8">
        <h2 className="text-neutral-900 text-xl font-bold mb-2">Progresso</h2>
        <p className="text-neutral-700 text-sm">
          Você completou {progress}% das votações!
        </p>
        <span className="text-neutral-700 text-sm">
          Selecione a categoria abaixo e escolha o melhor indicado para receber
          o prêmio!{' '}
        </span>
        <ProgressBar
          value={progress}
          className="h-1 mt-4 bg-neutral-300 [&>*]:bg-blue-700"
        />
      </div>
      <Separator className="bg-neutral-200" />
    </>
  )
}
