import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", expenses: 1200, income: 2500 },
  { month: "Feb", expenses: 1800, income: 2500 },
  { month: "Mar", expenses: 1400, income: 2600 },
  { month: "Apr", expenses: 2000, income: 2700 },
  { month: "May", expenses: 1600, income: 2500 },
  { month: "Jun", expenses: 1900, income: 2800 },
];

export const MonthlyComparison = (): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expenses" fill="#8884d8" />
              <Bar dataKey="income" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
