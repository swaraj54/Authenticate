import mongoose, { Schema } from "mongoose";

const busSchema = new Schema({
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
    seatCapacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    busNumber: {
        type: String,
        required: true,
        index: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        default: null,
        index: true
    }
});

busSchema.index({ busNumber: 1, sellerId: 1 });

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
