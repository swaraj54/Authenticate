import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import api from '../../helper/AxiosConfig';
import toast from 'react-hot-toast';

const SellerRegister = () => {
    const router = useNavigate();
    const { Login, state } = useContext(AuthContext)
    const [sellerData, setSellerData] = useState({ password: "", email: "", name: "" })
    const handleChange = (event) => {
        setSellerData({ ...sellerData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/user/seller-register', { sellerData })
            if (response.data.success) {
                Login(response.data.token, response?.data.user)
                toast.success(response.data.message)
                setSellerData({ password: "", email: "", name: "" })
                router('/add-bus')
            }
        } catch (error) {
            toast.error(error?.response?.data.error)
        }
    }
    return (
        <div>
            <h1>Bus Owner  ?</h1>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input required type='text' onChange={handleChange} name='name' value={sellerData.name} /><br />
                <label>Email</label><br />
                <input required type='email' onChange={handleChange} name='email' value={sellerData.email} /><br />
                <label>password</label><br />
                <input required type='password' onChange={handleChange} name='password' value={sellerData.password} /><br />
                <input type='submit' value="Register" /><br />
            </form>
            <button onClick={() => router("/seller-login")}>Login ?</button>
            <button onClick={() => router(`/register`)}>User Register</button>
            <button onClick={() => router(`/login`)}>User Login</button>
        </div>
    )
}

export default SellerRegister