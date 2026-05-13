// api/reservations-list.js
// Returns reservations for a given date (or today) — admin only

import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple password check
  const adminPassword = req.headers['x-admin-password']
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)
    const { date, status } = req.query

    // Default to today if no date provided
    const targetDate = date || new Date().toISOString().split('T')[0]

    let reservations

    if (status && status !== 'all') {
      reservations = await sql`
        SELECT * FROM reservations
        WHERE date = ${targetDate} AND status = ${status}
        ORDER BY time ASC
      `
    } else {
      reservations = await sql`
        SELECT * FROM reservations
        WHERE date = ${targetDate}
        ORDER BY time ASC
      `
    }

    // Also get summary counts for today
    const counts = await sql`
      SELECT
        COUNT(*) FILTER (WHERE status = 'confirmed') AS confirmed,
        COUNT(*) FILTER (WHERE status = 'seated')    AS seated,
        COUNT(*) FILTER (WHERE status = 'no_show')   AS no_show,
        COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled,
        COUNT(*) AS total
      FROM reservations
      WHERE date = ${targetDate}
    `

    return res.status(200).json({
      date: targetDate,
      reservations,
      summary: counts[0],
    })
  } catch (error) {
    console.error('List reservations error:', error)
    return res.status(500).json({ error: error.message })
  }
}