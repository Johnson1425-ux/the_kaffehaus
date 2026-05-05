// api/mpesa-query.js
// Vercel serverless function — queries STK Push payment status

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { checkoutRequestId } = req.body

    if (!checkoutRequestId) {
      return res.status(400).json({ error: 'checkoutRequestId is required' })
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET
    const shortCode = process.env.MPESA_SHORT_CODE || '174379'
    const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'

    // ── Step 1: Get token ──
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const tokenRes = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        method: 'GET',
        headers: { Authorization: `Basic ${credentials}` },
      }
    )

    if (!tokenRes.ok) {
      return res.status(502).json({ error: 'Failed to get token' })
    }

    const { access_token } = await tokenRes.json()

    // ── Step 2: Build timestamp + password ──
    const now = new Date()
    const timestamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

    // ── Step 3: Query STK status ──
    const queryRes = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId,
        }),
      }
    )

    const queryData = await queryRes.json()

    // ResultCode 0 = success, 1032 = cancelled, 1037 = timeout, pending = still waiting
    return res.status(200).json({
      resultCode: queryData.ResultCode,
      resultDesc: queryData.ResultDesc,
      raw: queryData,
    })
  } catch (error) {
    console.error('Query error:', error)
    return res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}