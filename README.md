# Team Task Manager

A full-stack MERN application for managing team tasks with role-based access control (Admin/Member).

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT with bcrypt

## Features

### Authentication
- User signup and login with JWT
- Password hashing with bcrypt
- Role-based access: Admin and Member

### Role-Based Access
**Admin:**
- Create/Delete projects
- Add/remove members to projects
- Create/Delete/Assign tasks

**Member:**
- View assigned tasks
- Update task status

### Project Management
- Create, view, update, delete projects
- Add/remove members to projects
- Track project creation details

### Task Management
- Create, view, update, delete tasks
- Assign tasks to users
- Track task status (Pending, In Progress, Completed)
- Auto-detect overdue tasks
- Filter tasks by status, project, assigned user
- Search tasks

### Dashboard
- Total tasks count
- Completed tasks count
- Pending tasks count
- Overdue tasks count

## Folder Structure

```
team-task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   ├── services/     # API service
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                 # Node/Express backend
│   ├── models/            # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run at http://localhost:5000

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The app will run at http://localhost:5173

## Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/team-task-manager |
| JWT_SECRET | Secret key for JWT signing | - |
| PORT | Server port | 5000 |

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## API Documentation

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users (Admin only) |
| GET | /api/users/members | Get all members |

### Project Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project (Admin) |
| PUT | /api/projects/:id | Update project (Admin) |
| DELETE | /api/projects/:id | Delete project (Admin) |
| POST | /api/projects/:id/members | Add member (Admin) |
| DELETE | /api/projects/:id/members/:userId | Remove member (Admin) |

### Task Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (with filters) |
| GET | /api/tasks/stats | Get task statistics |
| POST | /api/tasks | Create task (Admin) |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task (Admin) |

## Demo Credentials

After registering, you can create users with these roles:

**Admin User:**
- Can create projects, tasks, and manage members

**Member User:**
- Can view and update assigned tasks

Example for testing:
1. Register as Admin: `admin@test.com` (select "Admin" role)
2. Register as Member: `member@test.com` (select "Member" role)

## Deployment

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
3. Deploy the server

### Frontend (Vercel)
1. Import your GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL`: Your Railway backend URL
3. Deploy the frontend

## License

MIT