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

# Building the application
RUN npm run build

# Using Nginx as the server to serve the production build
FROM nginx:alpine

# Copying the build files to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Exposeing port 80
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
