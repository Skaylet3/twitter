import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not configured')
  }
  return secret
}

export const register = async (req: Request, res: Response) => {
  try {
    const { nickname, username, password, email } = req.body as Record<string, unknown>

    if (typeof nickname !== 'string' || typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
      throw new Error('All fields are required')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let newUser
    try {
      newUser = await User.create({
        nickname: nickname.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        passwordHash: hashedPassword,
      })
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err && (err as { code: number }).code === 11000) {
        return res.status(409).json({ error: 'Email or username already exist' })
      }
      throw err
    }

    const token = jwt.sign(
      { id: newUser._id.toString(), email: newUser.email },
      getJwtSecret(),
      { expiresIn: '30d' }
    )

    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: 'User created successfully',
        user: {
          id: newUser._id,
          username: newUser.username,
          nickname: newUser.nickname,
          email: newUser.email,
        },
      })
  } catch (err) {
    return res.status(400).json({ message: 'Registration failed', error: err instanceof Error ? err.message : err })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as Record<string, unknown>

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('All fields are required')
    }

    const user = await User.findOne({ username: username.trim().toLowerCase() }).select('+passwordHash')
    if (!user || !user.passwordHash) {
      throw new Error('The user is not found')
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      getJwtSecret(),
      { expiresIn: '30d' }
    )

    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
        },
      })
  } catch (err) {
    return res.status(400).json({ message: 'Login failed', error: err instanceof Error ? err.message : err })
  }
}

export const checkSomething = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token
    if (!token) {
      throw new Error('No token provided')
    }

    const decoded = jwt.verify(token, getJwtSecret())

    return res.status(200).json({ user: decoded })
  } catch (err) {
    return res.status(401).json({ error: err instanceof Error ? err.message : err })
  }
}

export const logOut = (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    })
    return res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}
