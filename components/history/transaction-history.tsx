"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "expense" | "income";
}

// Mock data - replace with actual data fetching
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Grocery Shopping",
    category: "Food",
    amount: -125.50,
    type: "expense",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Salary Deposit",
    category: "Income",
    amount: 3000.00,
    type: "income",
  },
];

const categories = ["Food", "Transport", "Income", "Shopping", "Bills", "Other"] as const;

export const TransactionHistory = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            aria-label="Search transactions"
          />
          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No transactions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell 
                      className={transaction.type === "expense" ? "text-red-500" : "text-green-500"}
                    >
                      {transaction.type === "expense" ? "-" : "+"}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          transaction.type === "expense" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
