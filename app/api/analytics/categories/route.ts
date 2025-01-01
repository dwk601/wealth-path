import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const userId = "yourUserIdHere"; // Retrieve actual userId from request, session, etc.
    const categories = await prisma.category.findMany({
      where: { userId, type: "EXPENSE" },
      include: { transactions: true },
    });
    const data = categories.map((category) => ({
      name: category.name,
      value: category.transactions.reduce(
        (acc, transaction) => acc + Number(transaction.amount),
        0
      ),
    }));
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching category data", { status: 500 });
  }
}
