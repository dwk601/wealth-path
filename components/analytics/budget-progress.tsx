import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type BudgetCategory = {
  category: string;
  spent: number;
  budget: number;
  percentage: number;
};

const mockBudgets: BudgetCategory[] = [
  { category: "Food", spent: 400, budget: 500, percentage: 80 },
  { category: "Transport", spent: 150, budget: 300, percentage: 50 },
  { category: "Shopping", spent: 200, budget: 400, percentage: 50 },
  { category: "Bills", spent: 800, budget: 1000, percentage: 80 },
];

export const BudgetProgress = (): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBudgets.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span>
                  ${item.spent} / ${item.budget}
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
