"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown";

// Mock notifications - In a real app, this would come from an API
const mockNotifications = [
  {
    id: "1",
    message: "Your monthly spending report is ready",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    message: "New feature: Budget tracking is now available",
    timestamp: "1 day ago",
  },
];

export const DashboardHeader = (): JSX.Element => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard" 
          className="relative h-10 w-12 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo/logo.png"
            alt="Wealth Path Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <div className="flex items-center space-x-4">
          <NotificationsDropdown
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSettingsClick}
            aria-label="Settings"
            className="hover:bg-slate-100"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/avatars/water_avatar.jpg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
