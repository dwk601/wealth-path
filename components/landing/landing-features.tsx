"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, PiggyBank, Calendar } from "lucide-react";

export const LandingFeatures = (): JSX.Element => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <BarChart2 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Record Transactions</CardTitle>
              <CardDescription>
                Easily log your income and expenses with our intuitive interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Keep track of every penny with customizable categories and tags.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <PiggyBank className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Manage Finances</CardTitle>
              <CardDescription>
                Get a clear overview of your financial health with powerful analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Visualize your spending habits and identify areas for improvement.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Plan for the Future</CardTitle>
              <CardDescription>
                Set financial goals and create budgets to achieve your dreams.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track your progress and receive personalized recommendations.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
