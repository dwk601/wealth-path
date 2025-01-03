"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { ExpenseSummary } from "@/components/dashboard/expense-summary";
import { MobileNavigationBar } from "@/components/dashboard/mobile-navigation-bar";
import { AddTransactionButton } from "@/components/ui/add-transaction-button";

export default function DashboardPage(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 pb-16 md:pb-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <BalanceCard />
            <ExpenseSummary />
          </div>
          <div className="mt-6">
            <RecentTransactions />
          </div>
        </main>
        <AddTransactionButton />
        <MobileNavigationBar />
      </div>
    </div>
  );
}
