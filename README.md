# Form Validation with Authentication and Authorization

This is a full-stack app built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It focuses on form validation in React.js with different routes. The application also implements authentication and authorization using JWT (JSON Web Tokens) for secure user access.

## Why Did I Build This?

My goal was to learn and implement the fundamentals of authentication, authorization, and REST APIs using Node.js with the Express.js framework for the first time, all while integrating it with React.js.

## Features

- **Form Validation:** Ensures data integrity and provides a seamless user experience.

- **Authentication:** User authentication using JWT for secure access to protected routes.

- **Authorization:** Authorization mechanism to control access to different parts of the application.

- **Protected Routes (JWT):** Only users with valid authentication credentials can access specific routes.

- **Token Security:** Access tokens are stored in HTTPOnly cookies for a short time before they expire, enhancing security and reducing the risk of cross-site scripting (XSS) attacks.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

```
   git clone <repository-url>
   cd mern-form-auth
```
2. Install dependencies on the frontend and backend folders locally by running:

```
   npm install
```
3. Run the command below in both the frontend and backend folders:

```
   npm start
```

The local server will start on localhost:3000 for the frontend and localhost:3500 for the backend. Ensure both servers are running simultaneously for the full functionality of the application.
