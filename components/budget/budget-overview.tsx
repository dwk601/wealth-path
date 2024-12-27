"use client"

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch('/api/budgets?userId=user-id') // Replace with actual user ID
        if (!response.ok) throw new Error('Failed to fetch budgets')
        const data = await response.json()
        setBudgets(data)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBudgets()
  }, [])

  if (isLoading) {
    return <Card className="h-[200px] animate-pulse" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((budget: any) => (
          <div key={budget.id} className="space-y-2">
            <div className="flex justify-between">
              <span>{budget.category.name}</span>
              <span>{budget.amount}</span>
            </div>
            <Progress value={75} /> {/* Calculate actual progress */}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
