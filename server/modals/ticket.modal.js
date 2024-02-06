import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true,
        index: true
    },
    departureCity: {
        type: String,
        required: true
    },
    destinationCity: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true
    },
});

ticketSchema.index({ userId: 1, busId: 1 });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
