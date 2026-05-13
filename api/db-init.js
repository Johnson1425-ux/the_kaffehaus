// Run once to create the reservations table in Neon PostgreSQL
// Call POST /api/db-init to initialize

import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    await sql`
      CREATE TABLE IF NOT EXISTS reservations (
        id              SERIAL PRIMARY KEY,
        name            VARCHAR(100) NOT NULL,
        phone           VARCHAR(20)  NOT NULL,
        date            DATE         NOT NULL,
        time            TIME         NOT NULL,
        guests          VARCHAR(5)   NOT NULL,
        notes           TEXT,
        deposit_paid    INTEGER      NOT NULL DEFAULT 0,
        payment_method  VARCHAR(20)  DEFAULT 'mpesa',
        checkout_id     VARCHAR(100),
        status          VARCHAR(20)  NOT NULL DEFAULT 'confirmed',
        created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
      )
    `

    await sql`CREATE INDEX IF NOT EXISTS idx_reservations_date   ON reservations(date)`
    await sql`CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status)`

    return res.status(200).json({ success: true, message: 'Database initialized successfully' })
  } catch (error) {
    console.error('DB init error:', error)
    return res.status(500).json({ error: error.message })
  }
}