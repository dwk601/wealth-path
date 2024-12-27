"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { TransactionHistory } from "@/components/history/transaction-history";

export default function HistoryPage(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
          <TransactionHistory />
        </main>
      </div>
    </div>
  );
}
