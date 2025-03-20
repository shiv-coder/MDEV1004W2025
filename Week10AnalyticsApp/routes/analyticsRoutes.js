const express = require('express');
const axios = require('axios');  
const router = express.Router();
const { trackAnalytics, getAnalytics } = require('../controllers/analyticsController');
const Analytics = require('../model/analyticsModel');

// Google Analytics Measurement Protocol Endpoint
const GA_MEASUREMENT_URL = 'https://www.google-analytics.com/collect';

// Your Google Analytics Tracking ID (for Universal Analytics) or Measurement ID (for GA4)
const GA_TRACKING_ID = 'G-3N37LZHLB8'; // Replace with your actual Tracking ID or Measurement ID

// Send event to Google Analytics via Measurement Protocol
const sendToGoogleAnalytics = async (eventCategory, eventAction) => {
    try {
        const payload = {
            v: '1',  // Protocol version
            tid: GA_TRACKING_ID,  // Google Analytics Tracking ID or Measurement ID
            cid: '555',  // Client ID (a unique identifier for each user, can be dynamic)
            t: 'event',  // Event type
            ec: eventCategory,  // Event category
            ea: eventAction,  // Event action
            el: 'button_click',  // Event label (optional)
            ev: '300',  // Event value (optional)
        };

        // Send the event data to Google Analytics
        await axios.post(GA_MEASUREMENT_URL, null, { params: payload });
        console.log('Event sent to Google Analytics');
    } catch (error) {
        console.error('Error sending event to Google Analytics:', error);
    }
};

// Track analytics for page visits and log Google Analytics events
router.get('/hello', trackAnalytics, async (req, res) => {
    // Google Analytics event
    await sendToGoogleAnalytics('page_view', '/hello');

    // MongoDB analytics tracking
    await Analytics.updateOne(
        { endpoint: '/hello' },
        { $inc: { hits: 1 }, $push: { timestamps: new Date() } },
        { upsert: true }
    );

    res.send('This is Analytics App');
});

router.get('/about', trackAnalytics, async (req, res) => {
    // Google Analytics event
    await sendToGoogleAnalytics('page_view', '/about');

    // MongoDB analytics tracking
    await Analytics.updateOne(
        { endpoint: '/about' },
        { $inc: { hits: 1 }, $push: { timestamps: new Date() } },
        { upsert: true }
    );

    res.send('About Us');
});

// Route to view analytics data from MongoDB
router.get('/analytics', getAnalytics);

module.exports = router;
