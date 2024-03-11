# Using the official Node.js image as base
FROM node:20.11.0

# Seting working directory
WORKDIR /app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the application code
COPY . .

# Exposeing the port on which the application runs
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "dev"]
