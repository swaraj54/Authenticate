import Booking from "../modals/booking.modal.js";
import Bus from "../modals/bus.modal.js";
import Ticket from "../modals/ticket.modal.js";

export const bookTicket = async (req, res) => {
    try {
        const { busNumber, seat, user, date } = req.body;
        if (!busNumber || !seat || !user || !date) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const bus = await Bus.findOne({ busNumber });
        if (!bus) {
            return res.status(404).json({ message: "Bus not found.", success: false });
        }

        const yesterDay = new Date(date);
        yesterDay.setHours(0, 0, 0, 0);

        const currentDay = new Date(yesterDay.getTime() + 24 * 60 * 60 * 1000);

        let bookingDoc = await Booking.findOne({
            busId: bus._id,
            date: {
                $gte: yesterDay,
                $lt: currentDay
            }
        });
        if (!bookingDoc) {
            bookingDoc = new Booking({
                busId: bus._id,
                date: yesterDay.toISOString().split('T')[0],
                bookings: [],
            });
        }

        const isSeatAvailable = !bookingDoc.bookings.some(booking => booking.seat === seat);
        if (!isSeatAvailable) {
            return res.status(400).json({ message: "Seat is already booked.", success: false });
        }

        const newBooking = {
            seat,
            user: user,
        };
        bookingDoc.bookings.push(newBooking);

        const existingTicket = await Ticket.findOne({ busId: bus._id, date, seatNumber: seat });
        if (existingTicket) {
            return res.status(400).json({ message: "Ticket already exists for the specified date and seat.", success: false });
        }

        await bookingDoc.save();

        const ticket = new Ticket({
            busId: bus._id,
            departureCity: bus.departureCity,
            destinationCity: bus.destinationCity,
            departureTime: bus.departureTime,
            seatNumber: seat,
            price: bus.price,
            date,
            isBooked: true,
            userId: user,
        });

        await ticket.save();

        return res.status(200).json({ message: "Booking and Ticket creation successful.", success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getOwnTickets = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User is required.", success: false });
        }

        const tickets = await Ticket.find({ userId }).populate({
            path: 'busId',
            select: 'busNumber',
        })

        return res.status(200).json({ tickets, success: true })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const busTicketHistory = async (req, res) => {
    try {
        const { userId, busNumber, selectedDate } = req.body;
        if (!userId || !busNumber || !selectedDate) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const userBus = await Bus.findOne({ busNumber });
        if (!userBus) {
            return res.status(400).json({ message: "Bus not exists.", success: false });
        }

        if (userBus?.sellerId != userId) {
            return res.status(400).json({ message: "Bus not belongs to you.", success: false });
        }

        const yesterDay = new Date(selectedDate);
        yesterDay.setHours(0, 0, 0, 0);

        const currentDay = new Date(yesterDay);
        currentDay.setDate(yesterDay.getDate() + 1);

        let bookingDoc = await Booking.findOne({
            busId: userBus._id,
            date: {
                $gte: yesterDay,
                $lt: currentDay
            }
        }).populate({
            path: 'bookings.user',
            select: 'name email'
        }).select('bookings');
        return res.status(200).json({ ticketsData: bookingDoc, success: true, message: "Ticket history fetched." })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
