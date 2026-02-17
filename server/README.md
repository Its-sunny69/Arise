# Arise - Backend

This is the backend API server for **Arise**, a collaborative task management platform built with Node.js, Express, and MongoDB.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **CORS** - Cross-Origin Resource Sharing

## 📦 Installation

```bash
npm install
```

## 🚀 Development

Start the server with auto-restart on file changes:

```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in `.env`)

## 🌐 Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/arise
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arise

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Optional: Set to production when deploying
NODE_ENV=development
```

## 📁 Project Structure

```
server/
├── controllers/              # Request handlers
│   ├── auth-controller.js    # Authentication logic
│   ├── todo-controller.js    # Personal todo CRUD
│   └── roomTodo-controller.js # Room todo CRUD
├── database/
│   └── database.js           # MongoDB connection
├── middleware/
│   ├── auth-middleware.js    # JWT authentication
│   └── validation-middleware.js # Request validation
├── models/                   # Mongoose schemas
│   ├── userModel.js         # User schema
│   ├── todoModel.js         # Personal todo schema
│   ├── roomModel.js         # Room schema
│   └── roomTodoModel.js     # Room todo schema
├── router/
│   └── routes.js            # API routes
├── validation/
│   └── auth-validation.js   # Zod validation schemas
├── .env                     # Environment variables (not in git)
├── package.json
└── server.js                # Entry point
```

## 🔌 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Get Current User
```http
GET /api/auth/user
Authorization: Bearer <token>
```

### Personal Todos

#### Get User Todos
```http
GET /api/todos/:userId
Authorization: Bearer <token>
```

#### Create Todo
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "title": "Complete project documentation",
  "checked": false
}
```

#### Update Todo
```http
PUT /api/todos/:todoId
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "title": "Updated task title",
  "checked": true
}
```

#### Delete Todo
```http
DELETE /api/todos/:todoId
Authorization: Bearer <token>
```

### Rooms

#### Get Created Rooms
```http
GET /api/rooms/:userId
Authorization: Bearer <token>
```

#### Get Joined Rooms
```http
GET /api/rooms/join/:userId
Authorization: Bearer <token>
```

#### Create Room
```http
POST /api/rooms
Authorization: Bearer <token>
Content-Type: application/json

{
  "createdBy": "user_id",
  "roomName": "Team Project"
}
```

#### Delete Room
```http
DELETE /api/rooms/:roomId
Authorization: Bearer <token>
```

### Room Todos

#### Get Room Todos
```http
GET /api/room-todos/:roomId
Authorization: Bearer <token>
```

#### Create Room Todo
```http
POST /api/room-todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": "room_id",
  "title": "Shared team task",
  "checked": []
}
```

#### Update Room Todo
```http
PUT /api/room-todos/:todoId
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": "room_id",
  "title": "Updated task",
  "checked": ["user_id_1", "user_id_2"]
}
```

#### Delete Room Todo
```http
DELETE /api/room-todos/:todoId
Authorization: Bearer <token>
```

## 🔌 Socket.io Events

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `create-room` | `{ userId, roomName }` | Create a new room |
| `join-room` | `{ userId, roomId }` | Join an existing room |
| `leave-room` | `{ userId, roomId }` | Leave a room |
| `rejoin-room` | `{ userId, roomId }` | Rejoin room on reconnect |
| `send-msg` | `{ profileId, profileName, msg, timeStamp, roomId }` | Send chat message |
| `todo` | `{ todos, roomId }` | Broadcast todo update |
| `updateCheckbox` | `{ updatedTodo, roomId }` | Update todo checkbox |
| `progress` | `{ userId, count, roomId, todoLength }` | Update user progress |
| `delete-room` | `{ roomId, username, userId }` | Delete a room |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `room-created` | `{ roomId, room }` | Room successfully created |
| `room-joined` | `{ roomId, room, userId }` | User joined room |
| `room-update` | `{ updatedRoom }` | Room data updated |
| `update-users` | `{ users, roomId }` | Users list updated |
| `leave-user` | `{ users, userId, roomId }` | User left room |
| `updated-msg` | `{ messages, roomId }` | New message received |
| `addTodo` | `{ todos, roomId }` | Todo added/updated |
| `updateTodo` | `{ updatedTodo, roomId }` | Todo checkbox updated |
| `room-progress` | `{ count, roomId, todoLength }` | Progress updated |
| `update-members` | `{ memberCount, roomId }` | Member count changed |
| `delete` | `{ roomId, userId }` | Room deleted |
| `pointsSocket` | `{ rankings }` | Rankings updated |

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique, 3-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (default: now)
}
```

### Todo Model
```javascript
{
  user: ObjectId (ref: User),
  title: String (required),
  checked: Boolean,
  createdAt: Date (default: now)
}
```

### Room Model
```javascript
{
  roomId: String (required, unique),
  createdBy: ObjectId (ref: User),
  users: [ObjectId] (ref: User),
  messages: [{
    profileId: String,
    profileName: String,
    msg: String,
    timeStamp: String
  }],
  createdAt: Date (default: now)
}
```

### RoomTodo Model
```javascript
{
  roomId: String (required),
  title: String (required),
  checked: [String] (array of user IDs),
  createdAt: Date (default: now)
}
```

## 🔐 Authentication Flow

1. **Registration**: User submits credentials → Validation → Password hashing → Save to DB → Generate JWT
2. **Login**: User submits credentials → Find user → Compare passwords → Generate JWT
3. **Protected Routes**: Client sends JWT in Authorization header → Middleware verifies token → Grant/Deny access

## 🛡️ Middleware

### Auth Middleware
Protects routes by verifying JWT tokens:
```javascript
// Verifies token from Authorization header
// Attaches user data to request object
// Returns 401 if token invalid/missing
```

### Validation Middleware
Validates request data using Zod schemas:
```javascript
// Validates request body against schema
// Returns 400 with error details if invalid
// Passes to next middleware if valid
```

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB Atlas or use a MongoDB hosting service
2. Configure environment variables on your hosting platform
3. Ensure CORS is properly configured for your frontend domain

### Recommended Hosting Platforms
- **Render** - Easy Node.js deployment
- **Railway** - Simple deployment with MongoDB add-on
- **Heroku** - Traditional PaaS option
- **DigitalOcean App Platform** - Full-featured hosting

### Deployment Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas or hosted MongoDB
- [ ] Set strong `JWT_SECRET`
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting (recommended)
- [ ] Set up logging and monitoring
- [ ] Configure SSL/HTTPS

## 📊 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start server with nodemon (auto-restart) |

## 🔧 Development Tools

- **nodemon** - Auto-restart server on file changes
- **CORS** - Handle cross-origin requests during development

## 🐛 Debugging

Enable debug mode by setting in `.env`:
```env
DEBUG=socket.io:*
```

## 📝 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (dev only)"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Best Practices

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens expire after specified time
- Environment variables for sensitive data
- Input validation using Zod
- CORS configured for specific origins
- MongoDB injection prevention via Mongoose

## 📄 License

MIT

---

For the complete project documentation, see the [main README](../README.md) in the root directory.
