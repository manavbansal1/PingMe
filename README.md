# PingMe - Realtime Chat Application

PingMe is a full-stack real-time chat application built with modern web technologies, enabling users to connect, send messages, and see online status updates instantly.

## Features

- User Authentication (Signup, Login, Logout)
- Real-time Chatting
- User Search and Selection
- Display Online/Offline Status of Users
- Profile Picture Support
- Message History
- Responsive Design

## Technologies Used

### Client (Frontend)

- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a lightning-fast development experience.
- **Zustand**: A small, fast, and scalable bear-bones state-management solution.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Socket.IO Client**: For real-time, bidirectional event-based communication.
- **Tailwind CSS & DaisyUI**: For rapid UI development and styling.
- **React Hot Toast**: For elegant and responsive notifications.
- **Lucide React**: For beautiful and customizable SVG icons.

### Server (Backend)

- **Node.js & Express.js**: A powerful and flexible backend framework.
- **MongoDB & Mongoose**: NoSQL database and an ODM for Node.js.
- **Socket.IO**: For real-time, bidirectional event-based communication.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt.js**: For password hashing.
- **Cloudinary**: For cloud-based image and video management (for profile pictures).
- **Cookie Parser**: Middleware to parse cookies attached to the client request object.
- **Dotenv**: To load environment variables from a `.env` file.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Live Demo

You can access and test the live application without any local setup:

**Web Application Link:** [https://pingme-rf7s.onrender.com](https://pingme-rf7s.onrender.com)

**Test Credentials:**
- **User 1:**
  - Email: `user1@example.com`
  - Password: `123456`
- **User 2:**
  - Email: `user2@example.com`
  - Password: `123456`

Feel free to create your own account to explore all features.

## Setup and Installation

Follow these steps to set up and run the PingMe application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/manavbansal1/PingMe.git
cd PingMe
```

### 2. Install Dependencies

The project is a monorepo with separate `client` and `server` directories.

```bash
# Install dependencies for the server
cd server
npm install

# Install dependencies for the client
cd ../client
npm install

# Go back to the root directory
cd ..
```

### 3. Environment Variables

Create a `.env` file in the `server` directory (`PingMe/server/.env`) and add the following:

```
PORT=5001
MONGO_DB_URI="YOUR_MONGODB_CONNECTION_STRING"
JWT_SECRET="YOUR_JWT_SECRET_KEY"
CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET"
```

- **`PORT`**: The port your server will run on (e.g., 5001).
- **`MONGO_DB_URI`**: Your MongoDB connection string (e.g., from MongoDB Atlas).
- **`JWT_SECRET`**: A strong, random string for JWT token signing.
- **`CLOUDINARY_CLOUD_NAME`**, **`CLOUDINARY_API_KEY`**, **`CLOUDINARY_API_SECRET`**: Your Cloudinary credentials for image uploads.

### 4. Seeding the Database (Optional but Recommended)

To populate your database with initial user data (including profile pictures), run the seed script:

```bash
cd server
node src/Seeds/user.seed.js
```
*Note: This script will first clear existing users and messages, then insert the seed data.*

## Running the Application

### Development Mode

To run both the client and server in development mode:

```bash
# Start the server (from the 'server' directory)
cd server
npm run dev
```
Open a new terminal:
```bash
# Start the client (from the 'client' directory)
cd client
npm run dev
```

The client will typically run on `http://localhost:5173` and the server on `http://localhost:5001`.

### Production Build

To create a production-ready build of the client:

```bash
# From the root directory
npm run build
```
This command will install dependencies for both client and server, and then build the client application, creating a `dist` folder in the `client` directory.

To run the server in production mode (serving the built client assets):

```bash
cd server
npm start
```

## Deployment

### General Considerations

- **Root Directory**: Ensure your deployment platform's project root is correctly configured for your client and server services.
- **Build Commands**: Use `npm run build` for the client to generate the `dist` folder.
- **Environment Variables**: Configure all necessary environment variables on your deployment platform.
- **Node Version**: Ensure your deployment environment uses a compatible Node.js version (e.g., 20.x).

### Example for Client (e.g., Vercel, Netlify)

If deploying the client as a separate service:
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist`

### Example for Server (e.g., Render, Railway, Fly.io)

If deploying the server as a separate service:
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node src/index.js`
- Remember to configure environment variables.

## Contributing

Feel free to fork the repository, create a new branch, and submit pull requests.

## License

This project is licensed under the ISC License.
