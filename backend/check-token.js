const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMjk4ZjczLWU4ZjUtNGU0ZS1hN2U1LTZmMWQzMWUxNmQ5NSIsImlhdCI6MTc0NzIwNzc1OSwiZXhwIjoxNzQ3Mjk0MTU5fQ.4kKgHbdGNtuMRUqIaefrLLlP7lTLlMyaH5kUT8_Y7uA';
    
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    console.log('Decoded token:', decoded);
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    
    console.log('User details:', user);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
