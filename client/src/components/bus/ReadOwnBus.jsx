import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import api from '../../helper/AxiosConfig';
import toast from 'react-hot-toast';

const ReadOwnBus = () => {
    const { state } = useContext(AuthContext);
    const [buses, setBuses] = useState([])
    const router = useNavigate();
    useEffect(() => {
        async function getOwnBuses() {
            try {
                const response = await api.post('/bus/read-own-buses', { id: state?.user?.id })
                if (response?.data.success) {
                    setBuses(response.data.buses)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        if (state?.user && state?.user?.role !== 'seller') {
            router('/')
        }
        if (state?.user && state?.user?.role == 'seller') {
            getOwnBuses()
        }
        if (state?.user == null && state?.user?.role === undefined) {
            router('/')
        }
    }, [state])

    return (
        <div>
            <h1>Your buses</h1>
            {buses?.length ? <div>
                {buses?.map((bus, i) => (
                    <div onClick={() => router(`/tickets-data/${bus?.busNumber}`)} key={bus._id} style={{ border: '2px solid white', cursor: 'pointer', marginBottom: "20px" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                                <h2>Departure City : {bus.departureCity}</h2>
                                <h2>Destination City : {bus.destinationCity}</h2>
                            </div>
                            <div>
                                <h2>{i + 1}. {bus.busNumber}</h2>
                                <h2>Click here to check Tickets history </h2>
                            </div>
                            <div>
                                <h2>Departure Time : {bus.departureTime}</h2>
                                <h2>Seat Price : {bus.price}/-</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div> : <div>Loading..</div>}
        </div>
    )
}

export default ReadOwnBus