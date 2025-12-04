'use client'

import { Label, Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useMemo } from 'react'

// const chartData = [
//   { browser: 'chrome', visitors: 275, fill: '#4335A7' },
//   { browser: 'safari', visitors: 200, fill: '#80C4E9' },
//   { browser: 'firefox', visitors: 287, fill: '#FFF6E9' },
//   { browser: 'edge', visitors: 173, fill: '#FF7F3E' },
//   { browser: 'other', visitors: 190, fill: '#1F4529' },
// ]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export type CategoryChartProps = {
  slug: string
  title: string
  description: string
  votes: {
    name: string
    count: number
    fill: string
  }[]
}

export function CategoryPieChart({
  // slug,
  title,
  description,
  votes,
}: CategoryChartProps) {
  const totalVotes = useMemo(() => {
    return votes.reduce((acc, curr) => acc + curr.count, 0)
    
  }, [votes])
  
  console.log(votes, totalVotes)
  return (
    <div>
      <Card className="min-h-[470px] flex flex-col bg-neutral-100 border border-neutral-200">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-neutral-950">{`${title}`}</CardTitle>
          <CardDescription className="text-neutral-600">
            Novembro 2025 - Janeiro 2026
          </CardDescription>
        </CardHeader>
        {votes && votes.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center h-full">
            <p className="text-neutral-600">Nenhum voto encontrado</p>
          </div>
        ) : (
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={votes}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    className="text-neutral-600"
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-neutral-950 text-3xl font-bold"
                            >
                              {totalVotes.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-neutral-600"
                            >
                              votos
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        )}
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="w-full grid grid-cols-2">
            {votes.map((vote) => {
              return (
                <div key={vote.name} className="w-full flex gap-2 items-center">
                  <div
                    style={{ background: vote.fill }}
                    className={`size-3 rounded`}
                  />
                  <span className="text-neutral-600 truncate">{vote.name}</span>
                </div>
              )
            })}
          </div>
          <div className="text-neutral-600 flex items-center gap-2 font-medium leading-none">
            {description}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
