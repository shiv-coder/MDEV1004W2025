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
    const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    return response.data.access_token;
  } catch (err) {
    console.error('Error generating access token:', err);
    throw new Error('Unable to generate access token');
  }
}

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const response = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'CAD',
            value: '30.00'
          }
        }]
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

    res.json({ id: response.data.id }); // Send order ID back to client
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

// Capture Order
app.post('/api/orders/:orderId/capture', async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const { orderId } = req.params;

    const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

    res.json(response.data);
  } catch (err) {
    console.error('Error capturing order:', err);
    res.status(500).json({ error: 'Unable to capture order' });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
