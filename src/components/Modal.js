import '../styles/Modal.css';

import React, { useState } from 'react'; 
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51O3NB3DAEuXKMCKmOosFav88sIF30U7vwHKjIo2h4jkJuf6xZSJrr2hMrJZvDzTJlBU9QtNEcAibPXnPVkWhuwV500AYNBN0jW');
export default function Modal({ isOpen,onClose}){


    //handling enabling and disabling input
     const [isDisabled, setIsDisabled] = useState(true);
     const [name, setName] = useState("");
     const [amount, setAmount] = useState('');


     //setting up the amount
     const handlePresetClick =(value)=> {
        setAmount(value);
        setIsDisabled(true); 
    };

   //for custom button,
    const  handleButtonClick=()=>{
        setIsDisabled(!isDisabled);
        if (isDisabled) setAmount('');
    };

    //modal open or close event handle
    if (!isOpen) 
        return null;

    const handleContainerClick =()=> {
       onClose();
    };

    const handleModalClick =(e)=> {
        e.stopPropagation();
    }

    //sending data to backend
    const handleDonate = async () => {
    // 1. Validation
    // if (!name || !amount) {
    //     alert("Please enter both a name and an amount.");
    //     return;
    // }

    try {
        // const response =await fetch('https://donate-urgent-backend.onrender.com/api/createuser', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json',

        //     },
        //     body:JSON.stringify({
        //         name: name,
        //         amount: Number(amount) 
        //     }),
        // });

        // const json = await response.json();


            // here we are rendering to the stripe page

            const stripeResponse = await fetch('https://donate-urgent-backend.onrender.com/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, amount })
            });

            const session = await stripeResponse.json();

            
            if (session.url) {
                window.location.href = session.url; 
            } else {
                 alert("Could not get checkout URL");
            }


        //     alert("Donation successfully recorded!");
        //     setName(""); 
        //     setAmount(""); 
        //     onClose(); 
        // } else {
        //     alert("Failed to save donation. Please try again.");
        // }


        }
        catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the server.");
    }
    
};

    return(
        <div class='modal-container'  onClick={handleContainerClick}>
            <div class='modal-Box' onClick={handleModalClick}>
                {/* <div></div> */}
                
                <h2>Support Jeron</h2>
                <input type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></input>


                <div class='amounts'>
                    <button class="amt-btn" onClick={() => handlePresetClick('25')}>$25</button>
                    <button class="amt-btn" onClick={() => handlePresetClick('35')}>$35</button>
                    <button class="amt-btn" onClick={() => handlePresetClick('50')}>$50</button>
                    <button class="amt-btn" onClick={() => handlePresetClick('60')}>$60</button>
                    <button class="amt-btn" onClick={() => handlePresetClick('75')}>$75</button>
                    <button class="amt-btn" id='price' onClick={handleButtonClick} >Custom</button>
                </div>

                <p className="note">Amounts shown are only suggestions. Donations are voluntary and do not grant any rights, services, or 
                interaction.
                </p>

                <input className="input-amount" type="number" placeholder="$25" 
                    disabled={isDisabled} 
                    value={amount}
                    onChange={(e)=> setAmount(e.target.value)}  />

                <button className="donate-btn" onClick={handleDonate}>Donate Now</button>
                <div className="checkbox">
                    <input type="checkbox" /><span>By ticking this checkbox you confirm this is a non-refundable voluntary contribution with no guaranteed services.
                    </span>
                </div>
            </div>
            
        </div>
    );
}
