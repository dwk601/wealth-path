"use client"

import { useTransactions } from '@/lib/hooks/use-transactions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LineChart } from '@/components/ui/line-chart'
import { Transaction } from '@prisma/client'

interface ChartData {
  labels: string[]
  data: number[]
}

export const SpendingTrends = () => {
  const { transactions, isLoading } = useTransactions("user-id")

  const processData = (): ChartData => {
    const monthlySpending = transactions.reduce((acc: Record<string, number>, curr: Transaction) => {
      const month = new Date(curr.date).toLocaleDateString('en-US', { month: 'short' })
      if (!acc[month]) acc[month] = 0
      if (curr.type === 'EXPENSE') {
        acc[month] += Number(curr.amount)
      }
      return acc
    }, {})

    return {
      labels: Object.keys(monthlySpending),
      data: Object.values(monthlySpending)
    }
  }

  if (isLoading) {
    return <Card className="h-[300px] animate-pulse" />
  }

  const chartData = processData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <LineChart data={chartData} />
      </CardContent>
    </Card>
  )
}
