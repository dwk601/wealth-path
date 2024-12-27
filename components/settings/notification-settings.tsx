"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NotificationSettings(): JSX.Element {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    monthly: true,
    weekly: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <p className="text-sm text-gray-500 mb-4">
          Choose how you want to receive notifications
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={notifications.email}
            onCheckedChange={() => handleToggle("email")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch
            id="push-notifications"
            checked={notifications.push}
            onCheckedChange={() => handleToggle("push")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="monthly-report">Monthly Report</Label>
          <Switch
            id="monthly-report"
            checked={notifications.monthly}
            onCheckedChange={() => handleToggle("monthly")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="weekly-summary">Weekly Summary</Label>
          <Switch
            id="weekly-summary"
            checked={notifications.weekly}
            onCheckedChange={() => handleToggle("weekly")}
          />
        </div>
        <Button className="mt-4">Save Preferences</Button>
      </div>
    </div>
  );
}
