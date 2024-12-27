"use client";
import Link from "next/link";
import { PiggyBank } from "lucide-react";

export const LandingHeader = (): JSX.Element => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <PiggyBank className="h-6 w-6 mr-2" />
          <span className="font-bold">WealthPath</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};
