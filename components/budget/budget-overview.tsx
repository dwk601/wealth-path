import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const BudgetOverview = () => {
  // Mock data - replace with actual data from your backend
  const budgetData = {
    totalBudget: 5000,
    spentAmount: 3250,
    remainingAmount: 1750,
    spentPercentage: 65,
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${budgetData.totalBudget}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spent Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-red-500">
              ${budgetData.spentAmount}
            </div>
            <Progress value={budgetData.spentPercentage} className="h-2" />
            <div className="text-sm text-gray-500">
              {budgetData.spentPercentage}% of budget used
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Remaining Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            ${budgetData.remainingAmount}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
