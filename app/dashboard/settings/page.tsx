"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AccountSettings } from "@/components/settings/account-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { PreferenceSettings } from "@/components/settings/preference-settings";
import { SecuritySettings } from "@/components/settings/security-settings";

export default function SettingsPage(): JSX.Element {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <AccountSettings />
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <SecuritySettings />
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <NotificationSettings />
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <PreferenceSettings />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
