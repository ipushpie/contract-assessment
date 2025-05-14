FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

# Create a startup script that runs migrations and then starts the app
COPY start-with-migrations.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
