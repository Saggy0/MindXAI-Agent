# 1. Base Image: Use an official Node.js image.
# Using a specific version is good practice for reproducibility.
FROM node:20-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
# Use a separate step for dependencies to leverage Docker's layer caching.
# First, copy over package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install

# 4. Copy application code
COPY . .

# 5. Build the application
# This command creates an optimized production build.
RUN npm run build

# 6. Production Image: Create a smaller, more secure image for production.
# Use a clean Node.js image without the build tools and source code.
FROM node:20-alpine AS production

WORKDIR /app

# Copy the built application from the 'base' stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 9002

# The command to start the app in production mode
CMD ["npm", "start", "--", "-p", "9002"]
