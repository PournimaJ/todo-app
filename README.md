# Todo App

A full-stack task management application built with modern web technologies. Organize your tasks efficiently with an intuitive user interface and reliable backend.

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Development Server**: json-server

## 📋 Features

- Create, read, update, and delete tasks
- Organized task management dashboard
- Responsive and intuitive user interface
- RESTful API backend
- Location-based task organization

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### Backend Setup

```bash
cd todo-backend
npm install
node server.js
```

### Frontend Setup

```bash
cd todo-frontend
npm install
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the `todo-backend` directory with the following configuration:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=todo_app
```

## 🚀 Getting Started

### Running the Application

- **Backend Server**: Runs on `http://localhost:5000`
- **Frontend Application**: Runs on `http://localhost:4200` or `http://localhost:5173` (Vite default)

### Available API Endpoints

```
GET    http://localhost:5000/locations
GET    http://localhost:5000/todos
POST   http://localhost:5000/todos
PUT    http://localhost:5000/todos/:id
DELETE http://localhost:5000/todos/:id
```

## 📸 Screenshots

### Dashboard View
![Dashboard](https://github.com/user-attachments/assets/39acc929-b411-4439-92d6-8e35f4819599)

### Tasks View
![Tasks](https://github.com/user-attachments/assets/5287caf6-56b7-436c-a216-40ccad57dbd7)

### Application Interface
![Interface 1](https://github.com/user-attachments/assets/1ece44e7-bb31-4337-a47f-d9d0df02aae5)

![Interface 2](https://github.com/user-attachments/assets/ef381d44-19c7-44cd-a8df-28a04dd969e0)

## 📂 Project Structure

```
todo-app/
├── todo-backend/          # Express.js backend
│   ├── server.js
│   ├── package.json
│   └── .env
├── todo-frontend/         # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Pournima Jathade**  
Front End Developer (Under Construction 🚀)

---

For more information or questions, feel free to reach out!