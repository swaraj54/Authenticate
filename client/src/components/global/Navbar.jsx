import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { state, Logout } = useContext(AuthContext);
    const router = useNavigate()
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', border: '2px solid white' }}>
            <h3 style={{ cursor: 'pointer' }} onClick={() => router('/')}>Black Bus</h3>
            {state?.user?.role == 'seller' ? <h3 onClick={() => router('/add-bus')} style={{ cursor: 'pointer' }}>Add Bus</h3> : <h3 onClick={() => router('/book-ticket')} style={{ cursor: 'pointer' }}>Book Ticket</h3>}
            {state?.user?.role && state?.user?.role == 'seller' && <h3 onClick={() => router('/read-own-bus')} style={{ cursor: 'pointer' }}>Your Bus</h3>}
            {state?.user?.role && state?.user?.role == 'user' && <h3 onClick={() => router('/your-tickets')} style={{ cursor: 'pointer' }}>Your Tickets</h3>}
            {state?.user?.id ? <h3 style={{ cursor: 'pointer' }} onClick={() => Logout()}>Logout</h3> : <h3 style={{ cursor: 'pointer' }} onClick={() => router('/login')}>Login/Register</h3>}
        </div>
    )
}

export default Navbar