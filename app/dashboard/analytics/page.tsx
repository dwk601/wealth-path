"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SpendingTrends } from "@/components/analytics/spending-trends";
import { CategoryAnalysis } from "@/components/analytics/category-analysis";
import { BudgetProgress } from "@/components/analytics/budget-progress";
import { MonthlyComparison } from "@/components/analytics/monthly-comparison";

export default function AnalyticsPage(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Financial Analytics</h1>
          <div className="grid gap-6 md:grid-cols-2">
            <SpendingTrends />
            <CategoryAnalysis />
          </div>
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <BudgetProgress />
            <MonthlyComparison />
          </div>
        </main>
      </div>
    </div>
  );
}
