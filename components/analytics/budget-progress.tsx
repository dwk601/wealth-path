"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type FetchedBudget = {
  id: string;
  amount: number;
  category: {
    name: string;
  };
};

export const BudgetProgress = (): JSX.Element => {
  const [budgets, setBudgets] = useState<FetchedBudget[]>([]);

  const handleFetchBudgets = async () => {
    try {
      const response = await fetch("/api/budgets?userId=USER_ID");
      if (!response.ok) return;
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchBudgets();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((item) => {
            const percentage = 0; // Calculate as needed
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.category.name}</span>
                  <span>
                    $0 / ${item.amount}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
