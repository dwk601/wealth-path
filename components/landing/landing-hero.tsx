"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LandingHero = (): JSX.Element => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Master Your Money, Shape Your Future
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Record, manage, and plan your finances with ease. Take control of your financial journey today.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="#">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
