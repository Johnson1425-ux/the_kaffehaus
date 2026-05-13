import { neon } from '@neondatabase/serverless'
import AfricasTalking from 'africastalking'

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
})
const sms = at.SMS

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, date, time, guests, notes, checkoutId, depositPaid } = req.body

    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const sql = neon(process.env.DATABASE_URL)

    // ── 1. Save to database ──
    const result = await sql`
      INSERT INTO reservations (name, phone, date, time, guests, notes, checkout_id, deposit_paid, status)
      VALUES (${name}, ${phone}, ${date}, ${time}, ${guests}, ${notes || null}, ${checkoutId || null}, ${depositPaid || 5000}, 'confirmed')
      RETURNING id
    `

    const reservationId = result[0].id

    // ── 2. Format date nicely ──
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

    // ── 3. SMS to customer ──
    const customerPhone = phone.replace(/\s+/g, '').replace(/^\+/, '').replace(/^0/, '255')
    const restaurantPhone = process.env.RESTAURANT_PHONE || '255687692312'

    const customerSMS =
      `Hi ${name}! Your table at The Kaffeehaus is confirmed.\n` +
      `Date: ${formattedDate}\n` +
      `Time: ${time}\n` +
      `Guests: ${guests}\n` +
      `Deposit: TZS 5,000 paid ✓\n` +
      `We look forward to welcoming you!`

    // ── 4. SMS to restaurant ──
    const restaurantSMS =
      `NEW RESERVATION #${reservationId}\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Date: ${formattedDate}\n` +
      `Time: ${time}\n` +
      `Guests: ${guests}\n` +
      (notes ? `Notes: ${notes}\n` : '') +
      `Deposit: TZS 5,000 (M-Pesa) ✓`

    const isSandbox = process.env.AT_USERNAME === 'sandbox'

    // Send both SMS (in sandbox, AT delivers to a test number)
    const smsPromises = [
      sms.send({
        to: [`+${customerPhone}`],
        message: customerSMS,
        ...(isSandbox ? {} : { from: 'Kaffeehaus' }),
      }),
      sms.send({
        to: [`+${restaurantPhone}`],
        message: restaurantSMS,
        ...(isSandbox ? {} : { from: 'Kaffeehaus' }),
      }),
    ]

    const smsResults = await Promise.allSettled(smsPromises)
    smsResults.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`SMS ${i} failed:`, r.reason)
      else console.log(`SMS ${i} sent:`, r.value)
    })

    return res.status(200).json({
      success: true,
      reservationId,
      message: 'Reservation saved and SMS sent',
    })
  } catch (error) {
    console.error('Create reservation error:', error)
    return res.status(500).json({ error: error.message })
  }
}