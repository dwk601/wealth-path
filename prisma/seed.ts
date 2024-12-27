import { PrismaClient, TransactionType, BudgetPeriod, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function clearDatabase() {
  const tablenames = ['Transaction', 'Budget', 'Category', 'Settings', 'User']
  try {
    for (const table of tablenames) {
      await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`)
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${table};`)
      await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`)
    }
  } catch (error) {
    console.error('Error clearing database:', error)
    throw error
  }
}

async function main() {
  try {
    // Clear existing data
    await clearDatabase()

    // Create test user
    const hashedPassword = await hash('password123', 10)
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
      },
    })

    // Create categories
    const categoryData = [
      { name: 'Salary', type: TransactionType.INCOME, icon: '💰' },
      { name: 'Freelance', type: TransactionType.INCOME, icon: '💻' },
      { name: 'Investments', type: TransactionType.INCOME, icon: '📈' },
      { name: 'Gifts', type: TransactionType.INCOME, icon: '🎁' },
      { name: 'Food', type: TransactionType.EXPENSE, icon: '🍔' },
      { name: 'Transport', type: TransactionType.EXPENSE, icon: '🚗' },
      { name: 'Housing', type: TransactionType.EXPENSE, icon: '🏠' },
      { name: 'Entertainment', type: TransactionType.EXPENSE, icon: '🎮' },
      { name: 'Shopping', type: TransactionType.EXPENSE, icon: '����️' },
      { name: 'Healthcare', type: TransactionType.EXPENSE, icon: '🏥' },
    ]

    const categories = await Promise.all(
      categoryData.map(({ name, type, icon }) =>
        prisma.category.create({
          data: {
            name,
            type,
            icon,
            user: { connect: { id: user.id } },
          },
        })
      )
    )

    // Set date ranges
    const endDate = new Date()
    const startDate = new Date(endDate)
    startDate.setFullYear(endDate.getFullYear() - 1)

    // Create transactions
    const transactionPromises = Array(50).fill(null).map(async () => {
      const type = faker.helpers.arrayElement([TransactionType.INCOME, TransactionType.EXPENSE])
      const categoryPool = categories.filter(c => c.type === type)
      const amount = new Prisma.Decimal(
        faker.number.float({ min: 10, max: 1000, fractionDigits: 2 })
      ).toFixed(2)

      const randomDate = new Date(
        startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
      )

      return prisma.transaction.create({
        data: {
          user: { connect: { id: user.id } },
          amount,
          type,
          category: { connect: { id: faker.helpers.arrayElement(categoryPool).id } },
          description: faker.lorem.sentence(),
          date: randomDate,
        },
      })
    })

    await Promise.all(transactionPromises)

    // Create budgets
    const budgetPromises = categories
      .filter(category => category.type === TransactionType.EXPENSE)
      .map(category => {
        const amount = new Prisma.Decimal(
          faker.number.float({ min: 100, max: 2000, fractionDigits: 2 })
        ).toFixed(2)

        const periodStart = new Date()
        const periodEnd = new Date()
        periodEnd.setMonth(periodEnd.getMonth() + 3) // 3 months budget period

        return prisma.budget.create({
          data: {
            user: { connect: { id: user.id } },
            category: { connect: { id: category.id } },
            amount,
            period: faker.helpers.arrayElement([
              BudgetPeriod.DAILY,
              BudgetPeriod.WEEKLY,
              BudgetPeriod.MONTHLY,
              BudgetPeriod.YEARLY,
            ]),
            startDate: periodStart,
            endDate: periodEnd,
          },
        })
      })

    await Promise.all(budgetPromises)

    // Create settings
    await prisma.settings.create({
      data: {
        user: { connect: { id: user.id } },
        currency: 'USD',
        theme: 'light',
        notifications: true,
      },
    })

    console.log('✅ Seed data created successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
