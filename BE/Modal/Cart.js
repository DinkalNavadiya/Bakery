import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    customerId: { type: String, require: true },
    userId: { type: ObjectId },
    productId: { type: String },
    name: {
        type: String,
        require: true,
    },
    weight: Number,
    quantity: Number,
    price: Number,
    totalPrice: Number,
    image: String,
    Stripe_Id: String,
    Stripe_priceId: String,
}, { timestamps: true });
const Carts = mongoose.model('Carts', cartSchema);

export default Carts;