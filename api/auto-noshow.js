// api/auto-noshow.js
// Vercel Cron Job — runs every hour
// Marks confirmed reservations as no_show if their time has passed by 30+ minutes

import { neon } from '@neondatabase/serverless'
import AfricasTalking from 'africastalking'

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
})
const sms = at.SMS

export default async function handler(req, res) {
  // Vercel cron sends GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)
    const isSandbox = process.env.AT_USERNAME === 'sandbox'

    // Find all confirmed reservations where (date + time + 30 minutes) < NOW()
    const overdueReservations = await sql`
      SELECT * FROM reservations
      WHERE status = 'confirmed'
        AND (date + time::interval + interval '30 minutes') < NOW()
    `

    if (overdueReservations.length === 0) {
      return res.status(200).json({ message: 'No overdue reservations', updated: 0 })
    }

    let updated = 0
    const errors = []

    for (const reservation of overdueReservations) {
      try {
        // Mark as no_show
        await sql`
          UPDATE reservations
          SET status = 'no_show', updated_at = NOW()
          WHERE id = ${reservation.id}
        `
        updated++

        // SMS the customer
        const customerPhone = reservation.phone
          .replace(/\s+/g, '')
          .replace(/^\+/, '')
          .replace(/^0/, '255')

        try {
          await sms.send({
            to: [`+${customerPhone}`],
            message:
              `Hi ${reservation.name}, we missed you at The Kaffeehaus today (${reservation.time}). ` +
              `We hope you're okay! Call us to rebook: +255 687 692 312.`,
            ...(isSandbox ? {} : { from: 'Kaffeehaus' }),
          })
        } catch (smsErr) {
          console.error(`SMS failed for reservation ${reservation.id}:`, smsErr)
        }
      } catch (err) {
        errors.push({ id: reservation.id, error: err.message })
      }
    }

    return res.status(200).json({
      message: `Marked ${updated} reservations as no_show`,
      updated,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error('Auto no-show error:', error)
    return res.status(500).json({ error: error.message })
  }
}