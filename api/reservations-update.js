// api/reservations-update.js
// Updates reservation status — seated, no_show, cancelled, confirmed

import { neon } from '@neondatabase/serverless'
import AfricasTalking from 'africastalking'

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
})
const sms = at.SMS

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Auth check
  const adminPassword = req.headers['x-admin-password']
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { id, status } = req.body

    if (!id || !status) {
      return res.status(400).json({ error: 'id and status are required' })
    }

    const validStatuses = ['confirmed', 'seated', 'no_show', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` })
    }

    const sql = neon(process.env.DATABASE_URL)

    const result = await sql`
      UPDATE reservations
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    const reservation = result[0]

    // Send SMS on no_show so customer knows
    if (status === 'no_show') {
      const customerPhone = reservation.phone.replace(/\s+/g, '').replace(/^\+/, '').replace(/^0/, '255')
      const isSandbox = process.env.AT_USERNAME === 'sandbox'

      try {
        await sms.send({
          to: [`+${customerPhone}`],
          message:
            `Hi ${reservation.name}, we noticed you missed your reservation at The Kaffeehaus ` +
            `on ${reservation.date} at ${reservation.time}. ` +
            `We hope all is well. Call us to rebook: +255 687 692 312.`,
          ...(isSandbox ? {} : { from: 'Kaffeehaus' }),
        })
      } catch (smsErr) {
        console.error('No-show SMS failed:', smsErr)
        // Don't fail the request if SMS fails
      }
    }

    return res.status(200).json({ success: true, reservation })
  } catch (error) {
    console.error('Update reservation error:', error)
    return res.status(500).json({ error: error.message })
  }
}