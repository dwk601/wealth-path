import { useEffect, useState } from 'react';

export interface ExpenseSummaryItem {
  category: string;
  amount: number;
}

export const useExpenseSummary = (userId: string) => {
  const [summary, setSummary] = useState<ExpenseSummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`/api/expense-summary?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch expense summary');
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching expense summary');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [userId]);

  return { summary, isLoading, error };
};
