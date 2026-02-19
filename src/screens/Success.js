// import React from 'react';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const isSaved = useRef(false);

    useEffect(() => {
        const saveData = async () => {
            const params = new URLSearchParams(location.search);
            const name = params.get('name');
            const amount = params.get('amount');
            
            if (isSaved.current) return;

            if (name && amount && !isSaved.current) {
                  isSaved.current = true; 
                try {
                    const response = await fetch('https://donate-urgent-backend.onrender.com/api/createuser', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, amount: Number(amount) })
                    });
                    
                    const data = await response.json();
                    if(data.success) {
                        console.log("Data saved successfully!");
                    }
                } catch (err) {
                    console.error("Error saving data:", err);
                }
            }
        };
        saveData();
    }, [location]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>✅</div>
                <h1 style={styles.title}>Payment Successful!</h1>
                <p style={styles.message}>
                    Thank you for your generous support. Your donation has been 
                    successfully recorded in our database.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    style={styles.button}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
    },
    card: {
        textAlign: 'center',
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px'
    },
    icon: {
        fontSize: '50px',
        marginBottom: '20px'
    },
    title: {
        color: '#28a745',
        marginBottom: '10px'
    },
    message: {
        color: '#6c757d',
        marginBottom: '30px',
        lineHeight: '1.5'
    },
    button: {
        padding: '10px 25px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.3s'
    }
};