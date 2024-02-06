import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './context/authContext';

const Home = () => {
    const { state } = useContext(AuthContext);
    const router = useNavigate();
    useEffect(() => {
        if (state?.user?.role == 'user') {
            router('/book-ticket')
        } else if (state?.user?.role == 'seller') {
            router('/add-bus')
        }
    }, [state])
    return (
        <div>
            <h1>Welcome to Black Bus Ticket Booking</h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: "100px" }}>
                <h1 onClick={() => router('/seller-login')} style={{ cursor: 'pointer', width: "30%", border: '1px solid black', height: "200px", display: "flex", justifyContent: 'center', alignItems: 'center' }}>Bus owner ? Add bus</h1>
                <h1 onClick={() => router('/book-ticket')} style={{ cursor: 'pointer', width: "30%", border: '1px solid black', height: "200px", display: "flex", justifyContent: 'center', alignItems: 'center' }}>Want to buy ticket ?</h1>
            </div>
        </div>
    )
}

export default Home