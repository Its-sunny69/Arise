# 🚀 Arise - Collaborative Task Management Platform

**Arise** is a modern, real-time collaborative task management application that helps individuals and teams organize their daily tasks, collaborate in shared rooms, and track progress together.

## ✨ Features

### 🎯 Personal Task Management
- Create, edit, and delete personal tasks
- Mark tasks as complete/incomplete
- Track daily progress with visual progress bars
- Get motivational quotes to stay inspired

### 👥 Collaborative Rooms
- Create private rooms for team collaboration
- Join existing rooms with unique room IDs
- Real-time chat functionality
- Shared task lists within rooms
- Live user presence tracking
- Room-based task progress tracking
- Individual and team rankings

### 🏆 Gamification
- World ranking system based on task completion
- Points and leaderboards
- Crown badges for top performers
- Real-time score updates

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Secure password encryption with bcrypt
- Protected routes and API endpoints

### 🎨 Modern UI/UX
- Responsive design for all devices
- Smooth animations with Lottie and React Spring
- Beautiful particle effects
- Material-UI components
- Tailwind CSS styling

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **Vite 7.3** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Lottie** - Animations
- **React Spring** - Spring physics animations
- **date-fns** - Date utilities
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - WebSocket server
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Arise/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Images, icons, and Lottie files
│   │   ├── context/       # React context providers (Socket)
│   │   ├── features/      # Feature-based modules
│   │   │   ├── auth/      # Authentication (Login, Signup, Logout)
│   │   │   ├── room/      # Room features (Chat, Todos, Cards)
│   │   │   └── todo/      # Personal todo management
│   │   ├── pages/         # App pages (Home, About, Contact, etc.)
│   │   └── shared/        # Shared components and utilities
│   │       ├── components/
│   │       ├── hooks/
│   │       └── utils/
│   └── public/            # Static assets
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── database/          # Database configuration
    ├── middleware/        # Custom middleware (auth, validation)
    ├── models/            # Mongoose schemas
    ├── router/            # API routes
    └── validation/        # Zod validation schemas
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Its-sunny69/Arise
   cd arise
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/arise
   JWT_SECRET=your_jwt_secret_key_here
   ```

   Start the server:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_SERVER_URL=http://localhost:5000
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📝 Available Scripts

### Client
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm start` - Start server with nodemon (auto-restart)

## 🔑 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Client (.env)
```env
VITE_SERVER_URL=http://localhost:5000
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get authenticated user

### Todos
- `GET /api/todos/:userId` - Get user's todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:todoId` - Update todo
- `DELETE /api/todos/:todoId` - Delete todo

### Rooms
- `GET /api/rooms/:userId` - Get user's created rooms
- `GET /api/rooms/join/:userId` - Get joined rooms
- `POST /api/rooms` - Create new room
- `DELETE /api/rooms/:roomId` - Delete room

### Room Todos
- `GET /api/room-todos/:roomId` - Get room todos
- `POST /api/room-todos` - Create room todo
- `PUT /api/room-todos/:todoId` - Update room todo
- `DELETE /api/room-todos/:todoId` - Delete room todo

## 🔌 Real-time Events (Socket.io)

### Client Events
- `create-room` - Create a new room
- `join-room` - Join an existing room
- `leave-room` - Leave a room
- `send-msg` - Send chat message
- `todo` - Update todos
- `updateCheckbox` - Update todo checkbox
- `progress` - Update user progress

### Server Events
- `room-update` - Room data updated
- `update-users` - Users list updated
- `updated-msg` - New message received
- `addTodo` - Todo added/updated
- `updateTodo` - Todo checkbox updated
- `room-progress` - Progress updated
- `pointsSocket` - Rankings updated

## 🎨 Features in Detail

### Personal Task Management
Create and manage your daily tasks with an intuitive interface. Track your progress throughout the day with visual indicators and get motivated with random inspirational quotes.

### Collaborative Rooms
Create private collaboration spaces where teams can:
- Share and manage tasks together
- Chat in real-time
- See who's online
- Track collective progress
- Compete on a leaderboard

### World Rankings
Compete globally with other users based on task completion. Earn points, climb the leaderboard, and earn badges.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Authors

- **Your Name** - [GitHub Profile](https://github.com/yourusername)
- **Your Name** - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Material-UI for the component library
- Lottie Files for beautiful animations
- The React and Node.js communities

## 📧 Contact

For questions or suggestions, please reach out:
- Email: your.email@example.com
- GitHub Issues: [Project Issues](https://github.com/yourusername/arise/issues)

---

**Built with ❤️ using React, Node.js, and MongoDB**
