"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./button";
import { TransactionDialog } from "@/components/transaction/transaction-dialog";

export const AddTransactionButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Add new transaction"
      >
        <Plus className="h-6 w-6" />
      </Button>
      <TransactionDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
