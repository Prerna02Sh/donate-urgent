import React,{useState, useEffect} from 'react';
import '../styles/Data.css';
export default function Data(){
    const [donations, setDonations]= useState([]);
    useEffect(()=>{
        const fetchDonations =async()=>{
            try{
                const response=await fetch('https://donate-urgent-backend.onrender.com/api/fetchdonations');
                const data=await response.json();
                setDonations(data);

            }
            catch(error){
                console.error("error in fetching the data",error);
            }
        };
        fetchDonations();
    },[]);
    return(
        <div>
            <h2>
                All Donations
            </h2>
            <table className='table-container'>
                <thead>
                    <tr >
                        <th> Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((num) => (
                      <tr key={num._id}>
                        <td>{num.name}</td>
                        <td>${num.amount}</td>
                     </tr>
                     ))}
                </tbody>
            </table>
        </div>
    )
}