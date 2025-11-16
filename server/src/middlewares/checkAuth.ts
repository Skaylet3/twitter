import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not configured')
  }
  return secret
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { id: string; email?: string }

    req.user = {
      id: decoded.id,
      email: decoded.email,
    }

    return next()
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }
}
