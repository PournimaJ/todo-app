import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/"); // redirect if not logged in
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/tasks`, { userId, text: input });
      setTasks([...tasks, res.data]);
      setInput("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`${BASE_URL}/tasks/${task.id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="todo-container">
      <div className="logout-bar">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="app-container">
        <h1>📝 To-Do List</h1>
        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task"
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTask(task)}>{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}