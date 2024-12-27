import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { TransactionType } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const summary = await db.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId: userId,
        type: TransactionType.EXPENSE,
        createdAt: {
          gte: firstDayOfMonth
        }
      },
      _sum: {
        amount: true
      }
    });

    // Fetch category names for the summary
    const categoriesWithAmounts = await Promise.all(
      summary.map(async (item) => {
        const category = await db.category.findUnique({
          where: { id: item.categoryId }
        });
        
        return {
          category: category?.name ?? 'Uncategorized',
          amount: Number(item._sum.amount ?? 0)
        };
      })
    );

    return NextResponse.json(categoriesWithAmounts);
    
  } catch (error) {
    console.error("[EXPENSE_SUMMARY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
