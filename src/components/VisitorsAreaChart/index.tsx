'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
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

const chartData = [
  { month: 'Agosto', desktop: 186, mobile: 80 },
  { month: 'Setembro', desktop: 305, mobile: 200 },
  { month: 'Outubro', desktop: 237, mobile: 120 },
  { month: 'Novembro', desktop: 73, mobile: 190 },
  { month: 'Dezembro', desktop: 209, mobile: 130 },
  { month: 'Janeiro', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function VisitorsAreaChart() {
  return (
    <Card className="flex flex-col bg-neutral-100 border border-neutral-200">
      <CardHeader>
        <CardTitle className="text-neutral-950">Acessos ativos</CardTitle>
        <CardDescription className="text-neutral-600">
          Esses foram a quantidade de acessos nos últimos meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="#60a5fa"
              fillOpacity={0.6}
              stroke="#60a5fa"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#1d4ed8"
              fillOpacity={0.6}
              stroke="#1d4ed8"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-neutral-600">
              Dados coletados entre os meses de Janeiro de 2025 e Janeiro de 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
