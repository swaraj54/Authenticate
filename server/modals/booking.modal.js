import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    bookings: [
        {
            seat: {
                type: Number,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ]
});

bookingSchema.index({ date: 1, busId: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
