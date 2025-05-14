const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Initialize Prisma client
const prisma = new PrismaClient();

// Create a module to export prisma
const db = { prisma };

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Request body:", req.body);
  }

  // Add response logging
  const originalSend = res.send;
  res.send = function (data) {
    console.log("Response:", data);
    return originalSend.call(this, data);
  };

  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Contract Assessment API is running" });
});

// Test route
app.post("/test-register", async (req, res) => {
  try {
    console.log("Test register route hit");
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

    // Create user directly with Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Not hashing for this test
        role: "USER",
      },
    });

    console.log("User created:", user);

    res.status(201).json({
      message: "Test user created successfully",
      user,
    });
  } catch (error) {
    console.error("Test register error:", error);
    res.status(500).json({
      message: "Test register error",
      error: error.message,
      stack: error.stack,
    });
  }
});

// Test route
app.post("/test", (req, res) => {
  console.log("Test route hit");
  console.log("Request body:", req.body);
  res.json({ message: "Test route successful", body: req.body });
});

// Import routes after prisma is initialized
const routes = require("./routes");

// API routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  console.error(err.stack);
  res.status(500).json({
    message: "Server error",
    error: err.message,
    stack: err.stack,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Export prisma client for use in other files
module.exports = db;
