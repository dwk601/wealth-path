"use client"

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
  labels: string[]
  data: number[]
}

export const LineChart = ({ data }: { data: ChartData }) => {
  // Transform the data into the format Recharts expects
  const chartData = data.labels.map((label, index) => ({
    name: label,
    amount: data.data[index]
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
