"use client"

import { useTransactions } from '@/lib/hooks/use-transactions'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils'
import { Transaction } from '@prisma/client'

export const RecentTransactions = () => {
  const { transactions, isLoading, error } = useTransactions("user-id") // Replace with actual user ID

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading transactions</div>
  }

  return (
    <div className="space-y-4">
      {transactions.slice(0, 5).map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
          <span className={`font-medium ${
            transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'
          }`}>
            {transaction.type === 'EXPENSE' ? '-' : '+'}
            {formatCurrency(Number(transaction.amount))}
          </span>
        </div>
      ))}
    </div>
  )
}
