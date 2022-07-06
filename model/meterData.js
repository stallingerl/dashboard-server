import mongoose from "mongoose";

const meterSchema = new mongoose.Schema({
  _id: { type: String,  unique: true, default: null },
  meter_id: { type: String, default: null},
  total_produced: { type: Number, default: null },
  total_consumed: { type: Number, default: null },
  timestamp: { type: Number }
});

export const MeterData = mongoose.model( 'MeterData', meterSchema);
