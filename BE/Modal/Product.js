import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
const price = new mongoose.Schema({
    priceId: String,
    time: String
})

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
    image: [String],
    // { type: [String], optional: true },
    Stripe_Id: String,
    Stripe_priceId: {
        type: [price],
        optional: true
    }
}, { timestamps: true })

productSchema.plugin(mongoosePaginate);
const Products = mongoose.model('product', productSchema);

export default Products

