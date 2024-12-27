"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AccountSettings } from "@/components/settings/account-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { PreferenceSettings } from "@/components/settings/preference-settings";
import { SecuritySettings } from "@/components/settings/security-settings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type SettingsTab = "account" | "security" | "notifications" | "preferences";

export default function SettingsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <Tabs
              value={activeTab}
              onValueChange={(value: string) => setActiveTab(value as SettingsTab)}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="p-6 bg-white rounded-lg shadow">
                <AccountSettings />
              </TabsContent>
              <TabsContent value="security" className="p-6 bg-white rounded-lg shadow">
                <SecuritySettings />
              </TabsContent>
              <TabsContent value="notifications" className="p-6 bg-white rounded-lg shadow">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="preferences" className="p-6 bg-white rounded-lg shadow">
                <PreferenceSettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
