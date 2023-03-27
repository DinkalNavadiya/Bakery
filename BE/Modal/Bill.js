import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const billSchema = new mongoose.Schema({
  customerId: { type: String, require: true },
  InvoiceNumber: { type: String, require: true },
  invoice_url: { type: String, require: true },
  invoice_pdf: { type: String, require: true },
  payment_status: { type: String, require: true },
  shipping: { type: Object, required: true },
  Product: { type: Object, required: true },
}, { timestamps: true });
const Bills = mongoose.model('Bills', billSchema);

export default Bills;