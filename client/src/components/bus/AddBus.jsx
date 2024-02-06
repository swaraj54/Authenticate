import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import api from '../../helper/AxiosConfig';

const AddBus = () => {
    const { state, Login } = useContext(AuthContext);
    const router = useNavigate();
    const [busData, setBusData] = useState({ departureTime: "", departureCity: "", destinationCity: "", seatCapacity: "30", price: "", busNumber: "" })
    const handleChange = (event) => {
        setBusData({ ...busData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/bus/add-bus', { busData, userId: state?.user?.id })
            if (response.data.success) {
                toast.success(response.data.message)
                setBusData({ departureTime: "", departureCity: "", destinationCity: "", seatCapacity: "30", price: "", busNumber: "" })
                router('/read-own-bus')
            }
        } catch (error) {
            toast.error(error?.response?.data.error)
        }
    }
    useEffect(() => {
        if (state && state?.user && state?.user?.role !== 'seller') {
            router('/')
        }
    }, [state])
    return (
        <div>
            <h1>Add Bus</h1>
            <form onSubmit={handleSubmit}>
                <label>Bus Number</label><br />
                <input required type='text' maxLength={10} onChange={handleChange} name='busNumber' value={busData.busNumber} /><br />
                <label>Ticket Price</label><br />
                <input required type='number' onChange={handleChange} name='price' value={busData.price} /><br />
                <label>Seat Capacity</label><br />
                <input readOnly type='number' onChange={handleChange} name='seatCapacity' value={busData.seatCapacity} /><br />
                <label>Departure Time</label><br />
                <input required type='time' onChange={handleChange} name='departureTime' value={busData.departureTime} /><br />
                <label>Departure City</label><br />
                <input required type='text' onChange={handleChange} name='departureCity' value={busData.departureCity} /><br />
                <label>Destination City</label><br />
                <input required type='text' onChange={handleChange} name='destinationCity' value={busData.destinationCity} /><br />
                <input type='submit' value="Submit" /><br />
            </form>
            <button onClick={() => router('/read-own-bus')}>Your buses, click here.</button>
        </div>
    )
}

export default AddBus