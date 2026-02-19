const express=require('express');
const router = express.Router()
const User=require('../models/User')
require('dotenv').config();
const { body, validationResult } = require('express-validator');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post("/createuser",
    //all validation check done here
    body('name').isString().withMessage("Name must be a String"),
    body('amount').isNumeric().withMessage("Amount must be a Number"),
    
    async(req, res)=> {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, errors:errors.array()})
    }

    
    try {
        await User.create({
            name: req.body.name,
            amount: req.body.amount
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

router.get("/fetchdonations",async(req,res)=>{
    try{
        const donations=await User.find({});
        res.json(donations);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

router.post("/create-checkout-session", async (req, res) => {
    const { name, amount } = req.body;

    try {
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     line_items: [{
        //         price_data: {
        //             currency: 'usd',
        //             product_data: { name: `Donation by ${name}` },
        //             unit_amount: amount * 100, 
        //         },
        //         quantity: 1,
        //     }],
        //     mode: 'payment',
        //     success_url: `https://donation-app-urgent.netlify.app/success?name=${encodeURIComponent(name)}&amount=${amount}`,
        //     cancel_url: 'https://donation-app-urgent.netlify.app/cancel',

        // });


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            metadata: { name: name }, 
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: `Donation by ${name}` },
                    unit_amount: amount * 100, 
                },
                quantity: 1,
            }],
            mode: 'payment',
            
            success_url: `https://donation-app-urgent.netlify.app/success`, 
            cancel_url: 'https://donation-app-urgent.netlify.app/cancel',
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;