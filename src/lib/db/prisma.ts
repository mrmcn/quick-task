import { PrismaClient } from '@prisma/client'

/**
 * Initializes a single instance of PrismaClient.
 * This approach ensures that only one active PrismaClient instance exists across the entire application,
 * which is a best practice for managing database connections efficiently.
 */
const prisma = new PrismaClient()

/**
 * A global object to store the PrismaClient instance during development.
 * This is necessary to prevent the creation of new PrismaClient instances
 * with every file change (hot-reloading) in the development environment.
 * Without this, hot-reloading could lead to an excessive number of database connections.
 */
const globalForPrisma = global as unknown as { prisma: typeof prisma }

/**
 * Conditional initialization of the global PrismaClient instance.
 * Sets `globalForPrisma.prisma` only when in development mode (`NODE_ENV !== 'production'`).
 * In a production environment, the `prisma` instance is created once during application startup,
 * and the global object is not used to avoid potential issues.
 */
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Exports the initialized PrismaClient instance.
 * This allows other parts of the application to import and use
 * this single, optimized PrismaClient instance for database interactions.
 */
export default prisma
