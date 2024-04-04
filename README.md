# Opening Hours Management Web App
This is a simple full-stack web application created using MongoDB, Express.js, React, and Node.js. The frontend is developed using React, while the backend is written in Node.js with Express.js. MongoDB is used as the database for storing opening hour data.

## Overview
The Opening Hours Management Web App allows users to view the opening and closing hours for each day of the week. All users can view the opening hours, but to add, change, or delete them, users must be logged in. User authentication is implemented using JWT (JSON Web Tokens) and bcrypt for secure authentication. Mongoose is used as an ODM (Object Data Modeling) library for MongoDB.

## Features
- **View Opening Hours**: Users can view the opening and closing hours for each day of the week.
- **User Authentication**: Users can log in to add, change, or delete opening hours. JWT and bcrypt are used for secure authentication.
- **CRUD Operations**: Authenticated users can add, change, or delete opening hours for different days of the week.
- **Testing**: The API endpoints are tested using Jest and Supertest to ensure reliability and correctness.

## Technologies Used
- **MongoDB**: NoSQL database for storing opening hour data.
- **Express.js**: Web application framework for Node.js, used for building the backend server.
- **React**: JavaScript library for building the frontend user interface.
- **Node.js**: JavaScript runtime environment for executing server-side code.
- **JWT**: JSON Web Tokens for user authentication.
- **bcrypt**: Password hashing library for securing user passwords.
- **Mongoose**: MongoDB object modeling library for Node.js.
- **Jest and Supertest**: Testing frameworks for testing API endpoints. 
