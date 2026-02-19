import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cancel() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>❌</div>
                <h1 style={styles.title}>Payment Cancelled</h1>
                <p style={styles.message}>
                    Your transaction was not completed. No money has been deducted from your account. 
                    If you faced an issue, you can try again.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    style={styles.button}
                >
                    Try Again
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
        backgroundColor: '#fff5f5' // Light reddish background
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
        color: '#dc3545', // Red color for cancel/error
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
        backgroundColor: '#6c757d', // Grey color for neutral action
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};