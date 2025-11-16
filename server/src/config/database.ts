import mongoose from 'mongoose'

type HealthRow = { now: string }

type HealthResult = { rows: HealthRow[] }

const ensureConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB is not connected')
  }
}

const query = async (_command: string): Promise<HealthResult> => {
  ensureConnected()
  const now = new Date().toISOString()
  return { rows: [{ now }] }
}

export default { query }
