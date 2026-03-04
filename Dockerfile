# Use stable Node version
FROM node:20

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit-dev

# Copy rest of the app
COPY . .
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start production build
CMD ["node", "dist/src/main.js"]