"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { type HistoricalData, type Timespan, type Reading } from "@/types"
import { useIsMobile } from "@/hooks/use-mobile" // Asumsi Anda punya hook ini

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

interface DashboardChartProps {
  historicalData: HistoricalData;
}

// 1. Sesuaikan chartConfig dengan data sensor Anda
const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "var(--primary)",
  },
  humidity: {
    label: "Humidity (%)",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export default function DashboardChart({ historicalData }: DashboardChartProps) {
  const isMobile = useIsMobile()
  // 2. State untuk menyimpan rentang waktu, default-nya 'daily'
  const [activeTimespan, setActiveTimespan] = React.useState<Timespan>("daily")

  React.useEffect(() => {
    // Otomatis ubah ke 'weekly' jika di mobile
    if (isMobile) {
      setActiveTimespan("weekly")
    }
  }, [isMobile])

  // 3. Pilih data yang akan ditampilkan berdasarkan state
  const chartData = historicalData?.[activeTimespan] || [];

  return (
    <Card className="@container/card bg-gradient-to-br from-muted/50 to-muted">
      <CardHeader>
        <CardTitle>Data Historical</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Temperature & Humidity Trends.
          </span>
          <span className="@[540px]/card:hidden">Temperature & Humidity Trends.</span>
        </CardDescription>
        <CardAction>
          {/* Tombol Toggle untuk Desktop */}
          <ToggleGroup
            type="single"
            value={activeTimespan}
            onValueChange={(value: Timespan) => {
                if (value) setActiveTimespan(value);
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem className="border-white/50 cursor-pointer" value="weekly">1 Week</ToggleGroupItem>
            <ToggleGroupItem className="border-white/50 cursor-pointer" value="daily"> Day</ToggleGroupItem>
            <ToggleGroupItem className="border-white/50 cursor-pointer" value="hourly">1 Hour</ToggleGroupItem>
          </ToggleGroup>
          {/* Menu Select untuk Mobile */}
          <Select value={activeTimespan} onValueChange={(value: Timespan) => setActiveTimespan(value)}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Pilih rentang waktu" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="weekly" className="rounded-lg">1 Week</SelectItem>
              <SelectItem value="daily" className="rounded-lg">1 Day</SelectItem>
              <SelectItem value="hourly" className="rounded-lg">1 Hour</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {chartData.length > 0 ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-humidity)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-humidity)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="created_at"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              />
              <YAxis yAxisId="left" domain={['dataMin - 2', 'dataMax + 2']} hide />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} hide />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              {/* <Legend /> */}
              {/* 4. Sesuaikan dataKey dengan data sensor */}
              <Area yAxisId="left" dataKey="temperature" type="natural" fill="url(#fillTemperature)" stroke="var(--color-temperature)" stackId="a" />
              <Area yAxisId="right" dataKey="humidity" type="natural" fill="url(#fillHumidity)" stroke="var(--color-humidity)" stackId="b" />

            </AreaChart>
          ) : (
             <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No data available.
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
