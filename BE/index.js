import express from "express";
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/Schema/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import http from 'http'
import { execute, subscribe } from "graphql";
import AppModels from "./Modal/index.js";
import TokUser from "./authentication/auth.js";
import productsRoute from './routes/product.js';
import Stripe from 'stripe';
import Bills from "./Modal/Bill.js";
import admin from "./routes/admin.js"
const stripe = new Stripe("sk_test_51Ml8CSSFJIURXQaEJKwTspiwgiqdzHsgfrwPYAwYElcqZ48pf0RqKqvvNhjXHDRz38nvRdje0vdSSRHvqK2yXTdJ007dAal3ud")

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use("/api/products", productsRoute);
app.use("/", admin)

const createOrder = async (customer, data) => {
    // console.log(data);
    const newOrder = new Bills({
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    })
        const res = await newOrder.save();
        return {
            id: res.id,
            ...res._doc
        }
};

const endpointSecret = "whsec_197b7d5c8d7f5228aaf4b604feec9f2f1e66c3fb29a94494080791a740a76709";

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
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
                    console.log(data);
                } catch (err) {
                    console.log(typeof createOrder);
                    console.log(err);
                }
            })
            .catch((err) => console.log(err.message));
    }
    response.status(200).end();

});
dotenv.config();
const httpServer = http.createServer(app);
const SECRET = process.env.STRIPE_S_KEY
async function initServer() {
    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer, path: "/graphql",
        }
    );

    const apolloServer = new ApolloServer({
        schema, plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    }
                }
            }
        ],
        context: async ({ req, connection }) => {
            if (connection) {
                return {
                    ...AppModels,
                };
            }
            if (req) {
                const me = await TokUser(req);
                return {
                    me,
                    secret: SECRET,
                    req,
                    ...AppModels,
                }
            }
        }
    })

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app, path: '/graphql', cors: false
    });
    const PORT = process.env.PORT;

    app.get('/', (_, res) => {
        res.send(" 🚀 server started successfully")
    })

    httpServer.listen(PORT, () => {
        console.log(`🚀 Express server is running on port ${PORT}`)
    })
}

initServer()