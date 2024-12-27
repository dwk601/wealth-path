import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonData {
  category: string;
  planned: number;
  actual: number;
  difference: number;
}

export const BudgetComparison = () => {
  // Mock data - replace with actual data
  const comparisons: ComparisonData[] = [
    {
      category: "Housing",
      planned: 2000,
      actual: 1800,
      difference: 200,
    },
    {
      category: "Food",
      planned: 800,
      actual: 600,
      difference: 200,
    },
    {
      category: "Transportation",
      planned: 400,
      actual: 250,
      difference: 150,
    },
    {
      category: "Entertainment",
      planned: 300,
      actual: 200,
      difference: 100,
    },
    {
      category: "Utilities",
      planned: 500,
      actual: 400,
      difference: 100,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Planned</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisons.map((item) => (
              <TableRow key={item.category}>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.planned}</TableCell>
                <TableCell>${item.actual}</TableCell>
                <TableCell
                  className={item.difference >= 0 ? "text-green-600" : "text-red-600"}
                >
                  ${Math.abs(item.difference)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
