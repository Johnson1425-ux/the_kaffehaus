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

    // ── SANDBOX MOCK ──
    // Safaricom sandbox always returns 1037 (no response) because the test
    // number 254708374149 is virtual — no real phone to confirm payment.
    // We wait 6s to simulate a realistic delay then return success.
    // Your real integration is proven: STK sends ✅  callback received ✅
    // Remove this block and uncomment the production code below when going live.
    if (process.env.MPESA_ENV !== 'production') {
      await new Promise((resolve) => setTimeout(resolve, 6000))
      return res.status(200).json({
        resultCode: '0',
        resultDesc: 'The service request is processed successfully. [SANDBOX MOCK]',
      })
    }

    // ── PRODUCTION: Real STK Push Query ──
    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET
    const shortCode = process.env.MPESA_SHORT_CODE
    const passkey = process.env.MPESA_PASSKEY

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const tokenRes = await fetch(
      'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        method: 'GET',
        headers: { Authorization: `Basic ${credentials}` },
      }
    )

    if (!tokenRes.ok) {
      return res.status(502).json({ error: 'Failed to get token' })
    }

    const { access_token } = await tokenRes.json()

    const now = new Date()
    const timestamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

    const queryRes = await fetch(
      'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query',
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

    return res.status(200).json({
      resultCode: String(queryData.ResultCode),
      resultDesc: queryData.ResultDesc,
    })

  } catch (error) {
    console.error('Query error:', error)
    return res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}