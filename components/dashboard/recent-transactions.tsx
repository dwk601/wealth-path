"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Home } from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Coffee Shop",
    amount: -4.50,
    date: "2024-01-20",
    category: "Food",
    icon: Coffee,
  },
  {
    id: 2,
    name: "Grocery Store",
    amount: -65.20,
    date: "2024-01-19",
    category: "Shopping",
    icon: ShoppingBag,
  },
  {
    id: 3,
    name: "Rent Payment",
    amount: -1200.00,
    date: "2024-01-18",
    category: "Housing",
    icon: Home,
  },
];

export const RecentTransactions = (): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`flex items-center ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.amount < 0 ? (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  )}
                  <span>${Math.abs(transaction.amount).toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
