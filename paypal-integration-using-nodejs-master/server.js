const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Generate Access Token
async function generateAccessToken() {
  try {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (err) {
    console.error('Error generating access token:', err.response?.data || err.message);
    throw new Error('Unable to generate access token');
  }
}

// Create Order (Get Approval URL)
app.post('/api/orders', async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'CAD',
              value: '30.00'
            },
            description: "Order for a BooK"
          }
        ],
        application_context: {
          return_url: 'http://localhost:3000/success', // Redirect after approval
          cancel_url: 'http://localhost:3000/cancel'  // Redirect if canceled
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract Approval URL
    const approvalUrl = response.data.links.find(link => link.rel === 'approve')?.href;
    if (!approvalUrl) {
      throw new Error('Approval URL not found');
    }

    res.json({ id: response.data.id, approval_url: approvalUrl });
  } catch (err) {
    console.error('Error creating order:', err.response?.data || err.message);
    res.status(500).json({ error: 'Unable to create order' });
  }
});



app.post('/api/orders/:orderId/capture', async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const { orderId } = req.params;

    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Error capturing order:', err.response?.data || err.message);
    res.status(500).json({ error: 'Unable to capture order' });
  }
});


// Success & Cancel Routes (Frontend should handle these)
app.get('/success', (req, res) => {
  res.send('Payment successful! You can now proceed with your order.');
});

app.get('/cancel', (req, res) => {
  res.send('Payment cancelled. Please try again.');
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
