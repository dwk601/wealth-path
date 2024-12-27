"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, PieChart, Clock, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: PieChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Clock, label: "History", href: "/dashboard/history" },
  { icon: Calendar, label: "Budget", href: "/dashboard/budget" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export const MobileNavigationBar = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t flex justify-between items-center text-sm text-gray-600">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-label={item.label}
          className={cn(
            "flex flex-col items-center justify-center py-2 flex-1 hover:bg-gray-100",
            pathname === item.href && "text-primary"
          )}
        >
          <item.icon className="h-5 w-5 mb-1" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
