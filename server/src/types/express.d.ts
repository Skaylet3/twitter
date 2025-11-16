declare namespace Express {
  interface Request {
    user?: {
      id: string
      email?: string
    }
    dateInfo?: {
      year: string
      month: string
    }
  }
}
