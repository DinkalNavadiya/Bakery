import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product Name is required'],
    },
    weight: {
        type: Number,
        required: [true, 'Product weight is required']
    },
    Dt_Mfg: Date,
    Dt_Exp: Date,
    price: {
        type: Number,
        required: [true, 'Product Price is required']
    },
    image: String,
    Stripe_Id: String,
    Stripe_priceId: [{ priceId: String, time: String }]
}, { timestamps: true })

productSchema.plugin(mongoosePaginate);
const Products = mongoose.model('product', productSchema);

export default Products

