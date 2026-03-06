# Todo Task Manager

A full-stack web application for managing personal tasks and todos with a modern, responsive user interface. Built with Node.js/Express backend and React frontend, featuring task CRUD operations, filtering, and statistics.

## Features

- ✅ **Task Management**: Create, view, update, and delete tasks
- 📋 **Task Properties**: Title, description, priority (low/medium/high), due date, completion status
- 🔍 **Filtering & Search**: Filter tasks by search query, priority level, and completion status
- 📊 **Task Statistics**: View total tasks, completed tasks, and pending tasks
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS and DaisyUI components
- 🚀 **Fast Development**: Vite-powered frontend with hot module replacement
- 🔄 **Real-time Updates**: Seamless task updates with React state management

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd todo-task-manager
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies (optional, for build scripts)
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/todo-task-manager
   # Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/todo-task-manager
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGO_URI` accordingly.

5. **Build and run the application:**
   ```bash
   # Build the project (installs dependencies and builds frontend)
   npm run build

   # Start the backend server
   npm start
   ```

   The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Development Mode

For development with hot reloading:

1. **Start the backend in development mode:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend in development mode:**
   ```bash
   cd frontend
   npm run dev
   ```

## Usage

1. **Home Page**: View all tasks with filtering options
   - Search tasks by title
   - Filter by priority (low/medium/high)
   - Filter by status (all/completed/pending)
   - View task statistics

2. **Create Task**: Add new tasks with title, description, priority, and due date

3. **Task Details**: View and edit individual tasks
   - Mark tasks as completed/incomplete
   - Update task information
   - Delete tasks

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks (with optional query parameters: `search`, `priority`, `status`) |
| GET | `/tasks/stats` | Get task statistics (total, completed, pending) |
| GET | `/tasks/:id` | Get a specific task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |

### Query Parameters for GET /tasks

- `search`: Search in task titles (case-insensitive)
- `priority`: Filter by priority (`low`, `medium`, `high`)
- `status`: Filter by completion status (`completed`, `pending`)

Example: `GET /tasks?search=meeting&priority=high&status=pending`

## Project Structure

```
todo-task-manager/
├── backend/                    # Backend application
│   ├── package.json
│   └── src/
│       ├── server.js          # Main server file
│       ├── config/
│       │   └── db.js          # Database connection
│       ├── controllers/
│       │   └── taskController.js  # Task business logic
│       ├── models/
│       │   └── taskModel.js   # Task data model
│       └── routes/
│           └── taskRoutes.js  # API routes
├── frontend/                   # Frontend application
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx           # Application entry point
│       ├── App.jsx            # Main React component
│       ├── index.css          # Global styles
│       ├── components/        # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── TaskCard.jsx
│       │   ├── TaskNotFound.jsx
│       ├── lib/               # Utility libraries
│       │   ├── axios.js
│       │   └── utils.js
│       └── pages/             # Page components
│           ├── HomePage.jsx
│           ├── CreatePage.jsx
│           └── TaskDetailPage.jsx
└── package.json               # Root package.json with build scripts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
