import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const budget = await db.budget.create({
      data: {
        userId: body.userId,
        categoryId: body.categoryId,
        amount: body.amount,
        period: body.period,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate)
      }
    });
    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating budget' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const budgets = await db.budget.findMany({
      where: { userId },
      include: {
        category: true
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(budgets);
  } catch (error) {
    console.error("[BUDGETS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
