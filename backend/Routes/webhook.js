const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter =nodemailer.createTransport({
    // service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    // },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

// Webhook endpoint logic

router.post('/', express.raw({ type: 'application/json' }), async(req, res) => {
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
        
        //stripe payload print here
        console.log('STRIPE PAYLOAD');
        console.log(JSON.stringify(session, null, 2)); 
       
        
        try {
            // Details in database store here
            await User.create({
                name: session.metadata.name,
                amount: session.amount_total / 100 
            });

             console.log(' Success: Payment data saved to MongoDB');

            //email send from here to Prerna (custom) o/w session
    
            const info = await transporter.sendMail({
                from: `"Donation App" <${process.env.EMAIL_USER}>`,
                to: session.customer_details.email, 
                subject: 'Donation Successful - Thank You!',
                text: `Hello ${session.metadata.name}, Thank you for your donation of ₹${session.amount_total / 100}.`,
                html: `<b>Hello ${session.metadata.name},</b><p>Thank you for your donation of <strong>₹${session.amount_total / 100}</strong>.</p>`
            });
            console.log('Email sent successfully:', info.messageId);


        } catch (dbErr) {
            console.log(' DB Error while saving:', dbErr);
        }
    }

    res.json({ received: true });
});

module.exports = router;