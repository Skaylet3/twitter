import path from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'node:http'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { Server as SocketIOServer } from 'socket.io'
import tweetRoutes from './routes/tweet.js'
import usersRoutes from './routes/user.js'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import pool from './config/database.js'

const app = express()
const server = http.createServer(app)

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:8080',
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('User connected')

  socket.emit('welcome', { message: 'Hello from server' })

  socket.on('pingServer', (data) => {
    console.log('Got ping:', data)
    socket.emit('pongClient', { time: Date.now() })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

app.get('/api/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ status: 'ok', time: result.rows[0] })
  } catch (err) {
    console.error('DB connection failed:', err)
    res.status(500).json({ status: 'error' })
  }
})

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:8080',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.resolve(__dirname, '../uploads')
app.use('/uploads', express.static(uploadsDir))

connectDB()

app.use('/api/tweets', tweetRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)

const PORT = Number(process.env.PORT) || 3000
server.listen(PORT, () => {
  console.log(`API + WS are running on port ${PORT}`)
})
