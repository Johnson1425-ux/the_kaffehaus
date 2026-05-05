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
    const securityCredential = process.env.MPESA_SECURITY_CREDENTIAL ||
      'd3spdx4cGM/BGQSA4ZvOs7q/TYQ9l+2YiMVNRW8+XNrdebdbC2t+WJpkJLeiVgqW3RjmvjbLwkngvoobFQVeOR/7+PAh6gytoUA97iYbpznODbDOlJ4R0csf+1O5rEf0gVUSBo/WNuHd5mt4/5xYITlmkk3n5h/YTwAAeNDjNEqmais/94Pu6d6gXipHt27r/pUzBCYa40JVAjgEiVv9UEyBIHu09dRV+6380iVG6Fv0K4fLFKkaRXJA24muFE7zHcIR/A8grqU+BflzvszJiOnobBt/sOWv8M9PNsgbSoig0sYLtzTRgykcZAJTifwlZsZsnvTnrxXvXMxw+JU5fA=='
    const callbackUrl = process.env.MPESA_CALLBACK_URL || 'https://webhook.site/34d45bf7-0d48-41d9-9502-3097950b7fe3'
    const isSandbox = process.env.MPESA_ENV !== 'production'
    const baseUrl = isSandbox
      ? 'https://sandbox.safaricom.co.ke'
      : 'https://api.safaricom.co.ke'

    // ── Step 1: Get access token ──
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

    const tokenRes = await fetch(
      `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        method: 'GET',
        headers: { Authorization: `Basic ${credentials}` },
      }
    )

    if (!tokenRes.ok) {
      return res.status(502).json({ error: 'Failed to get token' })
    }

    const { access_token } = await tokenRes.json()

    // ── Step 2: Try STK Push Query first ──
    // This is the simplest check — works directly with CheckoutRequestID
    const now = new Date()
    const timestamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '00') +
      String(now.getSeconds()).padStart(2, '0')

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

    const stkQueryRes = await fetch(
      `${baseUrl}/mpesa/stkpushquery/v1/query`,
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

    const stkQueryData = await stkQueryRes.json()
    console.log('STK Query response:', stkQueryData)

    // ResultCode 0 = success, anything else needs checking
    if (stkQueryData.ResultCode !== undefined) {
      const code = String(stkQueryData.ResultCode)

      if (code === '0') {
        return res.status(200).json({ resultCode: '0', resultDesc: stkQueryData.ResultDesc })
      }

      if (code === '1032') {
        return res.status(200).json({ resultCode: '1032', resultDesc: 'Cancelled by user' })
      }

      // 1037 = no response — fall through to TransactionStatus query using security credential
    }

    // ── Step 3: TransactionStatus query using Security Credential ──
    // Used when STK query returns 1037 (pending/no response) to get deeper status
    const txStatusRes = await fetch(
      `${baseUrl}/mpesa/transactionstatus/v1/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Initiator: 'testapi',
          SecurityCredential: securityCredential,
          CommandID: 'TransactionStatusQuery',
          TransactionID: checkoutRequestId,
          PartyA: shortCode,
          IdentifierType: '4',
          ResultURL: callbackUrl,
          QueueTimeOutURL: callbackUrl,
          Remarks: 'Status check',
          Occasion: 'Reservation deposit',
        }),
      }
    )

    const txStatusData = await txStatusRes.json()
    console.log('TX Status response:', txStatusData)

    // TransactionStatus accepted means still processing — keep polling
    if (txStatusData.ResponseCode === '0') {
      return res.status(200).json({
        resultCode: 'pending',
        resultDesc: 'Transaction status check initiated — still processing',
      })
    }

    // Return whatever we got
    return res.status(200).json({
      resultCode: String(stkQueryData.ResultCode || txStatusData.ResponseCode || 'pending'),
      resultDesc: stkQueryData.ResultDesc || txStatusData.ResponseDescription || 'Processing',
      raw: { stkQueryData, txStatusData },
    })

  } catch (error) {
    console.error('Query error:', error)
    return res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}