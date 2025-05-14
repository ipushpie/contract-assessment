const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Creating admin user...');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin123!', salt);
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    console.log('Admin user created:', admin);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1d' }
    );
    
    console.log('JWT token for admin user:');
    console.log(token);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
