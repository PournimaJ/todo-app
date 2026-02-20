import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL LOCAL connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",          // your MySQL user
  password: "Develop@123",  // your MySQL password
  database: "todo_app",
  waitForConnections: true,
  connectionLimit: 10,
});

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

// Test route
app.get("/", (req, res) => {
  res.send("MySQL backend running 🚀");
});

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashed]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ success: true, userId: user.id });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Get tasks
app.get("/tasks/:userId", async (req, res) => {
  const { userId } = req.params;
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId]
  );
  res.json(rows);
});

// Add task
app.post("/tasks", async (req, res) => {
  const { userId, text } = req.body;
  const [result] = await db.query(
    "INSERT INTO tasks (user_id, text, completed) VALUES (?, ?, false)",
    [userId, text]
  );

  res.json({
    id: result.insertId,
    text,
    completed: false,
  });
});

// Toggle task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  await db.query(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed, id]
  );
  res.json({ success: true });
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM tasks WHERE id = ?", [id]);
  res.json({ success: true });
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});