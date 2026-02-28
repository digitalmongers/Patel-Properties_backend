const express = require('express');
const contactRoute = require('./contact.route');

const router = express.Router();

router.use('/contact', contactRoute);

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

module.exports = router;
