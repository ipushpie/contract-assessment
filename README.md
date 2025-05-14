# Contract Assessment Application

A comprehensive application for evaluating vendor contracts, tracking product utilization, and making informed decisions about renewals, terminations, and renegotiations.

## Features

- Contract metadata review and validation
- Product usage evaluation
- Strategic forecasting and vendor assessment
- Role-based access control (Admin, Reviewer, Viewer)
- Comprehensive reporting

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- Zod
- shadcn/ui
- Auth.js

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (if running locally without Docker)

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contract-assessment-app
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Backend: Create a `.env` file in the `backend` directory based on the `.env.example` file
   - Frontend: Create a `.env.local` file in the `frontend` directory based on the `.env.example` file

4. Set up the database:
   ```bash
   # In the backend directory
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Start the development servers:
   ```bash
   # Start the backend server
   cd backend
   npm run dev

   # Start the frontend server
   cd ../frontend
   npm run dev
   ```

6. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Deployment

1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

3. Stop the containers:
   ```bash
   docker-compose down
   ```

## Project Structure

### Backend

```
backend/
├── prisma/              # Prisma schema and migrations
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── index.ts         # Entry point
├── .env                 # Environment variables
└── package.json         # Dependencies and scripts
```

### Frontend

```
frontend/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable components
│   ├── context/         # React context providers
│   ├── lib/             # Utility functions and API clients
│   └── styles/          # Global styles
├── .env.local           # Environment variables
└── package.json         # Dependencies and scripts
```

## License

[MIT](LICENSE)
