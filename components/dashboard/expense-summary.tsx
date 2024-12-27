"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenseSummary } from "@/lib/hooks/use-expense-summary";
import { useAuth } from "@/lib/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export function ExpenseSummary() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { summary, isLoading: isSummaryLoading, error } = useExpenseSummary(user?.id || "");

  const isLoading = isAuthLoading || isSummaryLoading;

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Please sign in to view your expenses</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">Failed to load expense summary</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <div className="space-y-4">
            {summary.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-sm text-muted-foreground">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
