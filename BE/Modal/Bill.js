import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const billSchema = new mongoose.Schema({
  customerId: { type: String, require: true },
  InvoiceNumber: { type: String, require: true },
  invoice_url: { type: String, require: true },
  invoice_pdf: { type: String, require: true },
  payment_status: { type: String, require: true },
  // paymentIntentId: { type: String, require: true },
  // subtotal: { type: Number, required: true },
  // total: { type: Number, required: true },
  shipping: { type: Object, required: true },
  // payment_status: { type: String, required: true },
  // payment_mode: { type: String, required: true },
  // subscriptionId: String,
}, { timestamps: true });
const Bills = mongoose.model('Bills', billSchema);

export default Bills;