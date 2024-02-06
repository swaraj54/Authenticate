import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../helper/AxiosConfig';
import { AuthContext } from '../../context/authContext';

const Bus = () => {
    const { selectedDate, busNumber } = useParams();
    const [bus, setBus] = useState({})
    const [bookingDetails, setBookingDetails] = useState({})
    const { state } = useContext(AuthContext)
    const router = useNavigate()
    useEffect(() => {
        async function getBusDetails() {
            try {
                const response = await api.post('/bus/get-bus-details', { busNumber, selectedDate })
                if (response?.data.success) {
                    setBus(response.data.details)
                    setBookingDetails(response.data.bookingDetails)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        if (busNumber) {
            getBusDetails()
        }
    }, [busNumber])

    const generateSeats = (start, end, step) => {
        const seats = [];

        const bookedSeats = bookingDetails ? bookingDetails?.bookings?.map(booking => booking.seat) : [];

        for (let i = start; i <= end; i += step) {
            const isBooked = bookedSeats?.includes(i);

            seats.push(
                <div
                    key={i}
                    onClick={() => isBooked ? null : BookTicket(i)}
                    style={{
                        cursor: isBooked ? 'not-allowed' : 'pointer',
                        width: '15%',
                        height: '50px',
                        border: '1px solid white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isBooked ? 'red' : 'green',
                    }}
                >
                    {i}
                </div>
            );
        }

        return seats;
    };


    const BookTicket = async (seat) => {
        if (state?.user?.role == 'user') {
            router(`/ticket-details/${selectedDate}/${busNumber}/${seat}`)
        } else {
            toast.error("Please login first.")
            router(`/login/${selectedDate}/${busNumber}/${seat}`)
        }
    }
    return (
        <div>
            <div style={{ border: '2px solid white', cursor: 'pointer', display: 'flex' }}>
                <div style={{ width: '10%', height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button onClick={() => router(`/book-ticket`)} style={{ cursor: 'pointer', width: "140px", height: '60px', borderRadius: "10px", fontSize: "24px", fontWeight: 'bolder' }}>Go Back</button>
                </div>
                <div style={{ width: '90%' }}>
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
            </div>
            <div >
                <h1>Lower Deck</h1>
                <div style={{ border: '2px solid white', display: 'flex', justifyContent: 'space-around', width: "80%", margin: "auto", fontSize: "24px", padding: "30px" }}>
                    <div style={{ width: "14%", borderRight: '2px solid white', display: 'flex', justifyContent: 'end', paddingRight: '20px' }}>
                        <div style={{ border: '2px solid white', height: '60px', width: '60px', borderRadius: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ border: '2px solid white', height: '45px', width: '45px', borderRadius: "50%", }}></div>
                        </div>
                    </div>
                    <div style={{ width: "86%", }}>
                        <div style={{ display: "flex", justifyContent: 'space-around', width: "90%", margin: 'auto', marginBottom: "30px" }}>
                            {generateSeats(1, 13, 3)}
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-around', width: "90%", margin: 'auto', marginBottom: "80px" }}>
                            {generateSeats(2, 14, 3)}
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-around', width: "90%", margin: 'auto' }}>
                            {generateSeats(3, 15, 3)}
                        </div></div>
                </div>
            </div>
            <div >
                <h1>Upper Deck</h1>
                <div style={{ border: '2px solid white', display: 'flex', justifyContent: 'space-around', width: "80%", margin: "auto", fontSize: "24px", padding: "30px" }}>
                    <div style={{ width: "14%", borderRight: '2px solid white', display: 'flex', justifyContent: 'end', paddingRight: '20px' }}>
                        <div style={{ border: '2px solid white', height: '60px', width: '60px', borderRadius: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ border: '2px solid white', height: '45px', width: '45px', borderRadius: "50%", }}></div>
                        </div>
                    </div>
                    <div style={{ width: "86%", }}>
                        <div style={{ display: "flex", justifyContent: 'space-around', width: "90%", margin: 'auto', marginBottom: "30px" }}>
                            {generateSeats(16, 28, 3)}
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-around', width: "90%", margin: 'auto', marginBottom: "80px" }}>
                            {generateSeats(17, 29, 3)}
                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-around', width: "90%", margin: 'auto' }}>
                            {generateSeats(18, 30, 3)}
                        </div></div>
                </div>
            </div>
        </div>
    )
}

export default Bus