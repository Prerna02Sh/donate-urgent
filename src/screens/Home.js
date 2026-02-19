// import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import Modal from '../components/Modal';

export default function Home(){
    const [open, setOpen]=useState(false);
    const navigate = useNavigate(); 

    const handledata = () => {
        navigate('/fetchdonations');
    };

    return(
        <div id="container">

            {/* <div><Navbar/></div> */}

            <div id="about">
             <img src="/logo192.png" alt="Logo" />
             <p id="name">Jeron</p>
             <p id="desc">Crypto Mentor | Digital Assets Research & Market Insights | Supporting Independent Analysis in the Web3 Ecosystem</p>
            </div>

            <div id="description">
                <p>Hi there 👋,I share independent research, insights, and tools related to crypto and digital technologies.
                All content is provided freely and publicly, without subscriptions, paywalls, or access restrictions.
                If you find this work useful and wish to support it, you may do so through a voluntary donation.</p>
                <button onClick={() =>setOpen(true)}>Support Jeron</button>
            </div>
            <Modal isOpen={open} onClose={() =>setOpen(false)} />

            <div>
                <button style={{ marginTop: "10px" }} onClick={handledata}>See all donations here</button>
            </div>
        </div>
        


    );
}
