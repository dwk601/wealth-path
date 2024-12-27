"use client";
import Link from "next/link";

export const LandingFooter = (): JSX.Element => {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 WealthPath. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
};
