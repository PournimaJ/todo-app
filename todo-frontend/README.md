TodoList App

Full-stack application built with:

React (Frontend)
Node.js + Express (Backend)
MySQL (Database)
Installation

Backend

cd todo-backend npm install node server.js

FrontendA

cd todo-frontend npm run dev

Environment Variables

Create a .env file in todog-backend:

PORT=5000 DB_HOST=localhost DB_USER=root DB_PASSWORD=******** DB_NAME=todo_app

Backend runs on http://localhost:5000
Frontend runs on5 http://localhost:4200 todo-backend % json-server --watch db.json --port 5000 Endpoints: http://localhost:5000/locations