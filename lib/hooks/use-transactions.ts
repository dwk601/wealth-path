import { useEffect, useState } from 'react'
import { Transaction } from '@prisma/client'

export const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions?userId=${userId}`)
        if (!response.ok) throw new Error('Failed to fetch transactions')
        const data = await response.json()
        setTransactions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching transactions')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [userId])

  return { transactions, isLoading, error }
}
