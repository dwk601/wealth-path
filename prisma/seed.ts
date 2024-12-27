import { PrismaClient, TransactionType, BudgetPeriod, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'

const MAX_RETRIES = 5
const INITIAL_BACKOFF = 1000 // 1 second

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function testConnection(attempt = 1): Promise<boolean> {
  try {
    console.log(`Connection attempt ${attempt} of ${MAX_RETRIES}...`)
    await prisma.$connect()
    
    // Verify connection with a simple query
    await prisma.$queryRaw`SELECT 1`
    
    console.log('✅ Successfully connected to the database')
    return true
  } catch (error) {
    console.error(`❌ Connection attempt ${attempt} failed:`, error)
    
    if (attempt < MAX_RETRIES) {
      const backoff = INITIAL_BACKOFF * Math.pow(2, attempt - 1)
      console.log(`Retrying in ${backoff/1000} seconds...`)
      await wait(backoff)
      return testConnection(attempt + 1)
    }
    
    return false
  }
}

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
  console.log('Starting database seed...')
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/:.+@/, ':****@'))
  
  // Test connection with retries
  const isConnected = await testConnection()
  if (!isConnected) {
    throw new Error('Failed to connect to database after multiple attempts')
  }

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma Client Error:', {
        code: error.code,
        message: error.message,
        meta: error.meta
      })
    } else {
      console.error('Unknown error:', error)
    }
    throw error
  }
}

// Increase timeout to 30 seconds
const timeout = setTimeout(() => {
  console.error('Operation timed out after 30 seconds')
  process.exit(1)
}, 30000)

main()
  .catch((error) => {
    console.error('Failed to seed database:', error)
    process.exit(1)
  })
  .finally(async () => {
    clearTimeout(timeout)
    await prisma.$disconnect()
  })
