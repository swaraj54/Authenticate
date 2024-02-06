import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom';
import api from '../../helper/AxiosConfig';
import toast from 'react-hot-toast';

const BookTicket = () => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();
  const [buses, setBuses] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (e) => {
    const userSelectedDate = new Date(e.target.value);
    setSelectedDate(userSelectedDate);
  };
  useEffect(() => {
    async function getOwnBuses() {
      try {
        const response = await api.get('/bus/get-all-buses')
        if (response?.data.success) {
          setBuses(response.data.buses)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
    getOwnBuses()
  }, [state])

  useEffect(() => {
    if (state?.user?.role === 'seller') {
      router('/')
    }
  }, [state])
  return (
    <div>
      <h1>Book Ticket</h1>
      <div>
        <label style={{ fontSize: "30px" }}>Select Date : </label>
        <input
          style={{ height: '50px', borderRadius: "20px", width: '180px', fontSize: "24px", cursor: 'pointer', marginBottom: '20px' }}
          type="date"
          value={selectedDate?.toISOString().split('T')[0]}
          onChange={handleDateChange}
        />
      </div>
      {buses?.length ? <div>
        {buses?.map((bus, i) => (
          <div onClick={() => router(`/book-ticket/${selectedDate}/${bus.busNumber}`)} style={{ border: '2px solid white', cursor: 'pointer', marginBottom: "20px" }}>
            <h1>{i + 1}. {bus.busNumber}</h1>
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
        ))}
      </div> : <div>Loading..</div>}
    </div>
  )
}

export default BookTicket