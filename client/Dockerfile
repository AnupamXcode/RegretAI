# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY client/package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY client/ .

# Build the app
RUN npm run build

# Stage 2: Serve
FROM node:20-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 5173

# Set environment
ENV NODE_ENV=production

# Serve the application
CMD ["serve", "-s", "dist", "-l", "5173"]
