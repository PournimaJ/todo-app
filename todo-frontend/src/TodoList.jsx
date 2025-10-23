import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ✅ Fetch tasks on load
  useEffect(() => {
    if (!userId) {
      navigate("/"); // redirect if no user logged in
    } else {
      fetchTasks();
    }
  }, []);

  // ✅ Use backticks for template literals
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/tasks", { userId, text: input });
      setTasks([...tasks, res.data]); // ✅ Now res is defined
      setInput("");
    } catch (err) {
      console.error("❌ Error adding task:", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("❌ Error toggling task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error("❌ Error deleting task:", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId"); // clear user session
    navigate("/"); // redirect to login page
  };


  return (
    <div className="todo-container">
  {/* Logout bar at top */}
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