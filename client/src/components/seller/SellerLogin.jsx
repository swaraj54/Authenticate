import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from './../../helper/AxiosConfig.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.js';


const SellerLogin = () => {
    const router = useNavigate();
    const { Login, state } = useContext(AuthContext)
    const [sellerData, setSellerData] = useState({ password: "", email: "" })
    const handleChange = (event) => {
        setSellerData({ ...sellerData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/user/seller-login', { sellerData })
            if (response.data.success) {
                Login(response.data.token, response?.data.user)
                setSellerData({ password: "", email: "" })
                router('/add-bus')
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data.error)
        }
    }
    useEffect(() => {
        if (state?.user?.role === "seller") {
            router('/add-bus')
        }
    }, [state])
    return (
        <div>
            <h1>Bus owner ?</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input required type='email' onChange={handleChange} name='email' value={sellerData.email} /><br />
                <label>password</label><br />
                <input required type='password' onChange={handleChange} name='password' value={sellerData.password} /><br />
                <input type='submit' value="Login" /><br />
            </form>
            <button onClick={() => router("/seller-register")}>Register ?</button>
            <button onClick={() => router(`/register`)}>User Register</button>
            <button onClick={() => router(`/login`)}>User Login</button>
        </div>
    )
}

export default SellerLogin