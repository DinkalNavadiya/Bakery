import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  customerId: { type: String, require: true },
  paymentIntentId: { type: String, require: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  shipping: { type: Object, required: true },
  payment_status: { type: String, required: true },
}, { timestamps: true });
const Bills = mongoose.model('Bills', billSchema);

export default Bills;