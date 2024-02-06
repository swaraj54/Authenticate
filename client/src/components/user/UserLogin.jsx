import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from './../../helper/AxiosConfig.js';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.js';


const UserLogin = () => {
    const { busnumber, seat, selectedDate } = useParams()
    const router = useNavigate();
    const { Login, state } = useContext(AuthContext)
    const [userData, setUserData] = useState({ password: "", email: "" })
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/user/login', { userData })
            if (response.data.success) {
                Login(response.data.token, response?.data.user)
                toast.success(response.data.message)
                setUserData({ password: "", email: "" })
                if (busnumber && seat) {
                    router(`/ticket-details/${selectedDate}/${busnumber}/${seat}`)
                } else {
                    router('/')
                }
            }
        } catch (error) {
            toast.error(error?.response?.data.error)
        }
    }
    useEffect(() => {
        if (state?.user?.role == 'user') {
            router('/book-ticket')
        } else if (state?.user?.role == 'seller') {
            router('/add-bus')
        }
    }, [state])
    return (
        <div>
            <h1>Want to buy ticket  ?</h1>
            <h2>Login/Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input required type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Password</label><br />
                <input required type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <input type='submit' value="Login" /><br />
            </form>
            <button onClick={() => router(`/register/${selectedDate}/${busnumber}/${seat}`)}>Register ?</button>
            <button onClick={() => router(`/seller-register`)}>Seller Register</button>
            <button onClick={() => router(`/seller-login`)}>Seller Login</button>
        </div>
    )
}

export default UserLogin