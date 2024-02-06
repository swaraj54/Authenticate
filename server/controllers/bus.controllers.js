import Booking from '../modals/booking.modal.js';
import Bus from './../modals/bus.modal.js'
export const addBus = async (req, res) => {
    try {
        const { departureTime, departureCity, destinationCity, seatCapacity, price, busNumber } = req.body.busData;
        const { userId } = req.body;
        if (!userId || !departureTime || !departureCity || !destinationCity || !seatCapacity || !price || !busNumber) {
            return res.status(404).json({ success: false, error: "All fields are required." })
        }
        const isBusExist = await Bus.findOne({ busNumber });
        if (isBusExist) {
            return res.status(404).json({ success: false, error: "Bus already exist, check bus number." })
        }
        const newBus = new Bus({
            sellerId: userId, departureTime, departureCity, destinationCity, seatCapacity, price, busNumber
        })
        await newBus.save();
        return res.status(201).json({
            success: true, message: 'Bus created Successfully.'
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}

export const readOwnBus = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(404).json({ success: false, error: "User is required." })
        }
        const buses = await Bus.find({ sellerId: id })
        return res.status(200).json({ success: true, buses })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}

export const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find({})
        return res.status(200).json({ success: true, buses })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}

export const getbusDetails = async (req, res) => {
    try {
        const { busNumber, selectedDate } = req.body;
        if (!busNumber) {
            return res.status(404).json({ success: false, error: "Bus Number is required." })
        }
        const bus = await Bus.findOne({ busNumber })
        const userSelectedDate = new Date(selectedDate);
        const utcSelectedDate = new Date(userSelectedDate.toISOString());
        const startOfDay = new Date(utcSelectedDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(utcSelectedDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const bookingDetails = await Booking.findOne({
            busId: bus._id,
            date: {
                $gte: startOfDay,
                $lt: endOfDay,
            },
        });
        return res.status(200).json({ success: true, details: bus, bookingDetails: bookingDetails })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong." })
    }
}