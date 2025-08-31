import express from "express";
import cors from "cors";
import "dotenv/config";
import tweetRoutes from "./routes/tweet.js";
import usersRoutes from './routes/user.js';
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from "socket.io";
import pool from "./config/database.js";

// import userRoutes from "./routes/user.js";
// import authRoutes from "./routes/auth.js";

const app = express();
const server = http.createServer(app);

//io socket listener
const io = new Server(server, {
  cors: { origin: "http://localhost:8080", credentials: true },
});

//logs
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//io socket messages to front
io.on("connection", (socket) => {
  socket.emit("welcome", { message: "Hello from server" });
});

//io socket messages from front
io.on("connection", (socket) => {
  socket.on("pingServer", (data) => {
    console.log("Got ping: ", data);
    socket.emit("pontClient", { time: Date.now() });
  });
});

//db postgres
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0] });
  } catch (err) {
    console.error('DB connection failed:', err);
    res.status(500).json({ status: 'error' });
  }
});


// Мидлвары
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//db
connectDB();

//routes
app.use('/api/tweets', tweetRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`API + WS are running on ${PORT} port`));
