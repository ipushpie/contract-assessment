const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking database connection...');
    
    // List all tables in the database
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
    console.log('Tables in database:', tables);
    
    // Try to query the User table
    try {
      const users = await prisma.user.findMany();
      console.log('User table exists and contains', users.length, 'records');
    } catch (e) {
      console.error('Error querying User table:', e.message);
    }
    
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
