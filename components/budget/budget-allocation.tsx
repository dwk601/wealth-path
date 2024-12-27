import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCategory {
  category: string;
  allocated: number;
  spent: number;
  percentage: number;
}

export const BudgetAllocation = () => {
  // Mock data - replace with actual data
  const categories: BudgetCategory[] = [
    { category: "Housing", allocated: 2000, spent: 1800, percentage: 90 },
    { category: "Food", allocated: 800, spent: 600, percentage: 75 },
    { category: "Transportation", allocated: 400, spent: 250, percentage: 62.5 },
    { category: "Entertainment", allocated: 300, spent: 200, percentage: 66.7 },
    { category: "Utilities", allocated: 500, spent: 400, percentage: 80 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{cat.category}</span>
                <span className="text-gray-500">
                  ${cat.spent} / ${cat.allocated}
                </span>
              </div>
              <Progress value={cat.percentage} className="h-2" />
              <div className="text-sm text-gray-500">
                {cat.percentage.toFixed(1)}% used
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
