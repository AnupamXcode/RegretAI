FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY server/ .

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Run the application
CMD ["node", "server.js"]
