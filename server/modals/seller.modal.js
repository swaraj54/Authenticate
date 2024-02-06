import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

sellerSchema.index({ email: 1 });

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
