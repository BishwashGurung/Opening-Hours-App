# Using the official Node.js image as base
FROM node:16

# Setting working directory
WORKDIR /app

# Copying package files and installing dependencies
COPY package*.json ./
RUN npm install

# Copying the rest of the application code
COPY . .

# Exposing the port on which the application runs
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "dev"]

