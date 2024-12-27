"use client";

import { Home, PieChart, Clock, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: PieChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Clock, label: "History", href: "/dashboard/history" },
  { icon: Calendar, label: "Budget", href: "/dashboard/budget" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export const DashboardSidebar = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">WealthPath</h2>
      </div>
      <nav className="space-y-1 px-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100",
              pathname === item.href
                ? "bg-gray-100 text-primary"
                : "text-gray-600"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
