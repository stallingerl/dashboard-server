import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    _id: { type: String, unique: true },
    booking_id: { type: String, unique: true },
    producer: { type: String, default: null },
    consumer: { type: String, default: null },
    energy: { type: Object },
    cid: { type: String, unique: true },
    doi_hash: { type: String, unique: true }
});

export const BookingData = mongoose.model('BookingData', bookingSchema);
