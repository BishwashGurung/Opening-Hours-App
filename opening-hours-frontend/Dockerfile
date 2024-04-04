# Stage 1: Build the Node.js application
FROM node:20.11.0 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build && \
    echo "Build completed successfully"

