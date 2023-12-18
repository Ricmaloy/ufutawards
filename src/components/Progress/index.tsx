import * as ProgressBar from '@radix-ui/react-progress'

export function Progress() {
  return (
    <div className="py-7">
      <h1 className="text-xl font-bold text-white">Progresso</h1>
      <span className="text-sm text-white">
        Você completou 55% das votações!
      </span>
      <p className="text-sm text-white">
        Selecione a categoria abaixo e escolha o melhor indicado para receber o
        prêmio
      </p>

      <ProgressBar.Root className="relative my-5 h-2 w-full overflow-hidden rounded-full bg-dark-200">
        <ProgressBar.Indicator
          className={`h-2 w-1/2 rounded-full bg-ocean-700`}
        />
      </ProgressBar.Root>
    </div>
  )
}
