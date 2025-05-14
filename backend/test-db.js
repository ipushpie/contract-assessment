const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing database connection...');
    
    // Test connection by querying for users
    const users = await prisma.user.findMany();
    console.log('Connection successful!');
    console.log(`Found ${users.length} users in the database.`);
    
    // Try to create a test user
    console.log('Attempting to create a test user...');
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER'
      }
    });
    
    console.log('User created successfully:', testUser);
    
  } catch (error) {
    console.error('Error connecting to the database:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
