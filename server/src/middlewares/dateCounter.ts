import type { NextFunction, Request, Response } from 'express'
import User from '../models/user.js'

const monthNames: Record<string, string> = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

export const dateCounter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const [year, month] = user.createdAt.toISOString().split('-')
    const countedMonth = monthNames[month] ?? month

    req.dateInfo = {
      year,
      month: countedMonth,
    }

    req.user = {
      id: userId,
      email: user.email,
    }

    return next()
  } catch (err) {
    return res.status(400).json({ message: 'There is an error', error: err instanceof Error ? err.message : err })
  }
}
