import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import api from '../../helper/AxiosConfig';

const Register = () => {
    const { busnumber, seat, selectedDate } = useParams()
    const router = useNavigate();
    const { Login, state } = useContext(AuthContext)
    const [userData, setUserData] = useState({ password: "", email: "", name: "" })
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/user/register', { userData })
            if (response.data.success) {
                Login(response.data.token, response?.data.user)
                toast.success(response.data.message)
                setUserData({ password: "", email: "", name: "" })
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
    return (
        <div>
            <h1>Want to buy ticket  ?</h1>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input required type='text' onChange={handleChange} name='name' value={userData.name} /><br />
                <label>Email</label><br />
                <input required type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>password</label><br />
                <input required type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <input type='submit' value="Register" /><br />
            </form>
            <button onClick={() => router(`/login/${selectedDate}/${busnumber}/${seat}`)}>Login</button>
            <button onClick={() => router(`/seller-register`)}>Seller Register</button>
            <button onClick={() => router(`/seller-login`)}>Seller Login</button>
        </div>
    )
}

export default Register