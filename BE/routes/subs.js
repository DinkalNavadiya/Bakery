import express from "express";
import Stripe from 'stripe';
import Bills from "../Modal/Bill.js";
import Carts from '../Modal/Cart.js';
const router = express.Router();
const createOrder = async (customer, data) => {
    const customerId = customer.id
    const query = { customerId: { $regex: customerId } };
    const cartData = await Carts.find(query);
    const result = await Carts.deleteMany(query);
    const invoice = await stripe.invoices.retrieve(
        data.invoice
    );
    const newOrder = new Bills({
        customerId: invoice.customer,
        InvoiceNumber: invoice.number,
        invoice_url: invoice.hosted_invoice_url,
        invoice_pdf: invoice.invoice_pdf,
        payment_status: invoice.status,
        shipping: data.customer_details,
        Product: cartData
    })
    const res = await newOrder.save();
    return {
        id: res.id,
        ...res._doc,
        result
    }
};
const endpointSecret = "whsec_197b7d5c8d7f5228aaf4b604feec9f2f1e66c3fb29a94494080791a740a76709";
const stripe = new Stripe("sk_test_51Ml8CSSFJIURXQaEJKwTspiwgiqdzHsgfrwPYAwYElcqZ48pf0RqKqvvNhjXHDRz38nvRdje0vdSSRHvqK2yXTdJ007dAal3ud");

router.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let data;
    let eventType;
    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    } else {
        data = request.body.data.object;
        eventType = request.body.type;
    }
    // Handle the event
    if (eventType === "checkout.session.completed") {
        console.log('🔔  Payment received!');
        stripe.customers
            .retrieve(data.customer)
            .then(async (customer) => {
                try {
                    createOrder(customer, data);
                } catch (err) {
                    console.log(typeof createOrder);
                    console.log(err);
                }
            })
            .catch((err) => console.log(err.message));
    }
    response.status(200).end();

});
export default router;





