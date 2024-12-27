"use client"

import { useTransactions } from '@/lib/hooks/use-transactions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

export const BalanceCard = () => {
  const { transactions, isLoading } = useTransactions("user-id") // Replace with actual user ID

  const calculateBalance = (): number => {
    return transactions.reduce((acc, curr) => {
      const amount = parseFloat(curr.amount.toString())
      return curr.type === 'EXPENSE' 
        ? acc - amount 
        : acc + amount
    }, 0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
        ) : (
          <div className="text-2xl font-bold">
            {formatCurrency(calculateBalance())}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
