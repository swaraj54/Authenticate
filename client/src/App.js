import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SellerLogin from './components/seller/SellerLogin';
import UserLogin from './components/user/UserLogin';
import Home from './Home';
import BookTicket from './components/booking/BookTicket';
import AddBus from './components/bus/AddBus';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Register from './components/user/Register';
import SellerRegister from './components/user/SellerRegister';
import ReadOwnBus from './components/bus/ReadOwnBus';
import Bus from './components/bus/Bus';
import TicketDetails from './components/ticket/TicketDetails';
import YourTickets from './components/user/YourTickets';
import Navbar from './components/global/Navbar';
import TicketsData from './components/seller/TicketsData';

function NotFound() {
  const router = useNavigate();
  return (
    <div>
      <h1>Page Not Found</h1>
      <h1 style={{ cursor: 'pointer' }} onClick={() => router('/')}>Go to Home </h1>
    </div>
  )
}

function App() {
  const { state } = useContext(AuthContext)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/:selectedDate/:busnumber/:seat' element={<Register />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/login/:selectedDate/:busnumber/:seat' element={<UserLogin />} />

        <Route path='/seller-register' element={<SellerRegister />} />
        <Route path='/seller-login' element={<SellerLogin />} />
        <Route path='/add-bus' element={<AddBus />} />
        <Route path='/read-own-bus' element={<ReadOwnBus />} />
        <Route path='/tickets-data/:busNumber' element={<TicketsData />} />

        <Route path='/book-ticket' element={<BookTicket />} />
        <Route path='/book-ticket/:selectedDate/:busNumber' element={<Bus />} />
        <Route path='/ticket-details/:selectedDate/:busNumber/:seat' element={<TicketDetails />} />
        <Route path='/your-tickets' element={<YourTickets />} />
      </Routes>
    </div>
  );
}

export default App;
