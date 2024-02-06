import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import toast from 'react-hot-toast';
import api from '../../helper/AxiosConfig';

const TicketsData = () => {
    const { busNumber } = useParams();
    const [ticketsData, setTicketsData] = useState({})
    const router = useNavigate();
    const { state } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (e) => {
        const userSelectedDate = new Date(e.target.value);
        setSelectedDate(userSelectedDate);
    };
    async function getTicketHistory() {
        try {
            setTicketsData({})
            const response = await api.post('/ticket/bus-ticket-history', { busNumber, selectedDate, userId: state?.user?.id })
            if (response?.data.success) {
                toast.success(response.data?.message)
                setTicketsData(response.data?.ticketsData?.bookings)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        if (state?.user && state?.user?.role !== 'seller') {
            router('/')
        }
    }, [state])
    return (
        <div>
            <div><br />
                <label style={{ fontSize: "30px" }}>Select Date : </label><br /><br />
                <input
                    style={{ height: '50px', borderRadius: "20px", width: '180px', fontSize: "24px", cursor: 'pointer', marginBottom: '20px' }}
                    type="date"
                    value={selectedDate?.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                /><br />
                <button onClick={getTicketHistory} style={{ height: '50px', borderRadius: "20px", width: '180px', fontSize: "24px", cursor: 'pointer', marginBottom: '20px' }}
                >Check History</button>
            </div>
            {ticketsData?.length ? <div>
                <div>
                    <h2>Total ticket Booked : {ticketsData?.length} </h2>
                    <h2>Total ticket pending : {30 - ticketsData?.length}  </h2>
                </div>
                {ticketsData?.map((ticket, i) => (
                    <div key={ticket._id} style={{ border: '2px solid white', cursor: 'pointer', marginBottom: "20px" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                                <h2>Seat : {ticket.seat}</h2>
                            </div>
                            <div>
                                <h2>User Name : {ticket.user.name}</h2>
                                <h2>User Email : {ticket.user.email}</h2>
                            </div>
                        </div>
                    </div>
                ))}</div> : <div>No tickets found.</div>}

        </div>
    )
}

export default TicketsData