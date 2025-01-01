import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const CategoryAnalysis = (): JSX.Element => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleFetchCategories = async () => {
      try {
        const response = await fetch("/api/analytics/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleFetchCategories();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categories.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
