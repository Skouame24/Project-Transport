"use client"

import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
}

export function BarChart({
  data,
  categories,
  index,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => value.toString(),
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          formatter={valueFormatter}
          cursor={{ fill: "transparent" }}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart({
  data,
  categories,
  index,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => value.toString(),
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          formatter={valueFormatter}
          cursor={{ fill: "transparent" }}
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}