import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import api from '../../helper/AxiosConfig';
import toast from 'react-hot-toast';

const TicketDetails = () => {
    const { busNumber, seat, selectedDate } = useParams();
    const router = useNavigate();
    const { state } = useContext(AuthContext)
    const [bus, setBus] = useState({})
    const [confirmPayment, setConfirmPayment] = useState(false)

    const finalBooking = async () => {
        try {
            const response = await api.post('/ticket/book-ticket', { busNumber, seat, user: state?.user?.id, date: selectedDate })
            if (response?.data.success) {
                toast.success(response.data.message)
                setConfirmPayment(true)
                router('/your-tickets')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }

    }

    useEffect(() => {
        async function getBusDetails() {
            try {
                const response = await api.post('/bus/get-bus-details', { busNumber, selectedDate })
                if (response?.data.success) {
                    setBus(response.data.details)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        if (busNumber && seat) {
            getBusDetails()
        }
        if (state && state?.user && state?.user?.role != 'user') {
            router('/')
        }
    }, [state, busNumber, seat])
    return (
        <div>
            <h1>Bus Details</h1>
            <div style={{ border: '2px solid white' }}>
                <h1> {bus.busNumber}</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <h2>Departure City : {bus.departureCity}</h2>
                        <h2>Destination City : {bus.destinationCity}</h2>
                    </div>
                    <div>
                        <h2>Departure Time : {bus.departureTime}</h2>
                        <h2>Seat Price : {bus.price}/-</h2>
                    </div>
                </div>
            </div>
            <h1>Ticket Details</h1>
            <div style={{ border: '2px solid white', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <h2>Seat No : {seat}</h2>
                    </div>
                    <div>
                        <h2>Seat Price : {bus.price}/-</h2>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: "60px" }}>
                <button onClick={() => router(`/book-ticket/${selectedDate}/${busNumber}`)} style={{ cursor: 'pointer', width: "180px", height: '80px', borderRadius: "10px", fontSize: "24px", fontWeight: 'bolder' }}>Go Back</button>
                <button onClick={() => setConfirmPayment(true)} style={{ cursor: 'pointer', width: "180px", height: '80px', borderRadius: "10px", fontSize: "24px", fontWeight: 'bolder' }}>Pay now</button>
            </div>
            {confirmPayment && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'black',
                    border: '1px solid white',
                    width: '80%',
                    height: '500px',
                    margin: 'auto'
                }}>
                    <h1 style={{
                        height: "50%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>Confirm Payment</h1>
                    <div style={{
                        height: "20%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                        <button onClick={finalBooking} style={{ cursor: 'pointer', width: '35%', height: "100px", fontSize: "32px" }}>Yes</button>
                        <button onClick={() => setConfirmPayment(false)} style={{ cursor: 'pointer', width: '35%', height: "100px", fontSize: "32px" }}>No</button>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default TicketDetails