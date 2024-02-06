import React, { useContext, useEffect, useState } from 'react'
import api from '../../helper/AxiosConfig'
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const YourTickets = () => {
    const [tickets, setTickets] = useState([]);
    const { state } = useContext(AuthContext)
    const router = useNavigate()

    useEffect(() => {
        async function getUserTickets() {
            try {
                const response = await api.post("/ticket/get-own-tickets", { userId: state?.user?.id })
                if (response?.data.success) {
                    setTickets(response.data.tickets)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        if (state?.user?.id) {
            getUserTickets()
        } else {
            router('/')
        }
    }, [state])
    return (
        <div>
            <h1>Your Tickets </h1>
            {tickets?.length ? <div>
                {tickets?.map((ticket, i) => (
                    <div style={{ border: '2px solid white', width: '80%', margin: 'auto', marginBottom: '20px' }}>
                        <h1>{i + 1}. {ticket.busId.busNumber}</h1>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                                <h2>Bus Number : {ticket.busId.busNumber}</h2>
                                <h2>Departure City : {ticket.departureCity}</h2>
                                <h2>Destination City : {ticket.destinationCity}</h2>
                                <h2>Date : {new Date(ticket.date).toLocaleDateString()}</h2>
                            </div>
                            <div>
                                <h2>Departure Time : {ticket.departureTime}</h2>
                                <h2>Seat Price : {ticket.price}/-</h2>
                                <h2>Seat Number : {ticket.seatNumber}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div> : <div>Loading..</div>
            }
        </div >
    )
}

export default YourTickets