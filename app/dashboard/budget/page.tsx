"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { BudgetOverview } from "@/components/budget/budget-overview";
import { BudgetAllocation } from "@/components/budget/budget-allocation";
import { BudgetSettings } from "@/components/budget/budget-settings";
import { BudgetComparison } from "@/components/budget/budget-comparison";
import { MobileNavigationBar } from "@/components/dashboard/mobile-navigation-bar";

export default function BudgetPage(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 pb-16 md:pb-4">
          <h1 className="text-2xl font-bold mb-6">Budget Management</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <BudgetOverview />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <BudgetAllocation />
            <BudgetComparison />
          </div>
          <div className="mt-6">
            <BudgetSettings />
          </div>
        </main>
        <MobileNavigationBar />
      </div>
    </div>
  );
}
