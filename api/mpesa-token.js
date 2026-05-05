// api/mpesa-token.js
// Vercel serverless function — fetches M-Pesa OAuth access token

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET

    if (!consumerKey || !consumerSecret) {
      return res.status(500).json({ error: 'M-Pesa credentials not configured' })
    }

    // Base64 encode credentials
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const response = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Token fetch failed:', errorText)
      return res.status(response.status).json({ error: 'Failed to fetch token', details: errorText })
    }

    const data = await response.json()

    return res.status(200).json({ access_token: data.access_token })
  } catch (error) {
    console.error('Token error:', error)
    return res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}