const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Webhook endpoint logic

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {

        event = stripe.webhooks.constructEvent(
            req.body, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(` Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        try {
            // DATABASE STORAGE: 
            await User.create({
                name: session.metadata.name,
                amount: session.amount_total / 100 
            });
            console.log(' Success: Payment data saved to MongoDB');
        } catch (dbErr) {
            console.log(' DB Error while saving:', dbErr);
        }
    }

    res.json({ received: true });
});

module.exports = router;