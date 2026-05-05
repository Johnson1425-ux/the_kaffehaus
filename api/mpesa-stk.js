// api/mpesa-stk.js
// Vercel serverless function — initiates M-Pesa STK Push

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phone, amount, accountRef, description } = req.body

    if (!phone || !amount) {
      return res.status(400).json({ error: 'phone and amount are required' })
    }

    // ── Step 1: Get access token ──
    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET
    const shortCode = process.env.MPESA_SHORT_CODE || '174379'
    const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    const callbackUrl = process.env.MPESA_CALLBACK_URL || 'https://webhook.site/34d45bf7-0d48-41d9-9502-3097950b7fe3'

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const tokenRes = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        method: 'GET',
        headers: { Authorization: `Basic ${credentials}` },
      }
    )

    if (!tokenRes.ok) {
      return res.status(502).json({ error: 'Failed to get M-Pesa token' })
    }

    const { access_token } = await tokenRes.json()

    // ── Step 2: Build STK Push payload ──
    const now = new Date()
    const timestamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

    // Normalize phone: strip leading 0 or + and ensure 254 prefix
    const normalizedPhone = phone
      .replace(/\s+/g, '')
      .replace(/^\+/, '')
      .replace(/^0/, '255')

    const stkPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(Number(amount)),
      PartyA: normalizedPhone,
      PartyB: shortCode,
      PhoneNumber: normalizedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountRef || 'KaffehausReservation',
      TransactionDesc: description || 'Table reservation deposit',
    }

    // ── Step 3: Initiate STK Push ──
    const stkRes = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPayload),
      }
    )

    const stkData = await stkRes.json()

    if (!stkRes.ok || stkData.ResponseCode !== '0') {
      console.error('STK Push failed:', stkData)
      return res.status(400).json({
        error: 'STK Push failed',
        details: stkData,
      })
    }

    return res.status(200).json({
      success: true,
      checkoutRequestId: stkData.CheckoutRequestID,
      merchantRequestId: stkData.MerchantRequestID,
      responseDescription: stkData.ResponseDescription,
    })
  } catch (error) {
    console.error('STK error:', error)
    return res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}