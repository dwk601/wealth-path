"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const BalanceCard = (): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-3xl font-bold">$24,563.00</div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>Income: $3,400</span>
            </div>
            <div className="flex items-center text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>Expenses: $2,100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
