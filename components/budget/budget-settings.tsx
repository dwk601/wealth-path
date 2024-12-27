import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BudgetSetting {
  category: string;
  amount: number;
}

export const BudgetSettings = () => {
  const [settings, setSettings] = useState<BudgetSetting[]>([
    { category: "Housing", amount: 2000 },
    { category: "Food", amount: 800 },
    { category: "Transportation", amount: 400 },
    { category: "Entertainment", amount: 300 },
    { category: "Utilities", amount: 500 },
  ]);

  const handleAmountChange = (category: string, amount: string) => {
    setSettings(
      settings.map((setting) =>
        setting.category === category
          ? { ...setting, amount: Number(amount) || 0 }
          : setting
      )
    );
  };

  const handleSave = () => {
    // TODO: Implement save functionality to backend
    console.log("Saving budget settings:", settings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            {settings.map((setting) => (
              <div key={setting.category} className="grid gap-2">
                <Label htmlFor={`budget-${setting.category}`}>
                  {setting.category} Budget
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id={`budget-${setting.category}`}
                    type="number"
                    value={setting.amount}
                    onChange={(e) =>
                      handleAmountChange(setting.category, e.target.value)
                    }
                    className="max-w-[200px]"
                  />
                  <span className="text-sm text-gray-500">USD</span>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save Budget Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
