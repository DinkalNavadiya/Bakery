// pass stripe {Radhi@8091} email{dinkal.scaleteam@gmail.com}
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
// import webhooksRoute from './routes/webhook.js';
// const stripe = new Stripe("sk_test_51MjfLaSBjblJasQOgTRUUnbgnOqDmvlgrDn2kMw4640qAcsLQS8Sz48IM4T9KDwBNXeENnHmzn8llPEnoH46sLve00jLIYdWbb")
import Stripe from 'stripe';
import Bills from "./Modal/Bill.js";
import admin from "./routes/admin.js"
// import subsRoutes from "./routes/subs.js"
const stripe = new Stripe("sk_test_51Ml3wzSDBdFF0CAL50Uyq52YJ0Fkv1M6v9XFLIz5Lybo08fOwkO6Ro30retFnHRC5FHURB6vKhceszmu0eyaEOsr00M9T0qOp8")

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use("/api/products", productsRoute);
// app.use("/api/webhook", webhooksRoute)
// app.use("/subs" , subsRoutes)
app.use("/", admin)

const createOrder = async (customer, data) => {
    console.log(data);

    // const paymentIntent = data.payment_intent
    // const oldOrder = await Bills.find({ paymentIntent })
    // if (oldOrder) {
    //     null
    // } else {
    const newOrder = new Bills({
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    })
    // console.log(newOrder);
    // if (data.payment_status === 'paid') {
        const res = await newOrder.save();
        return {
            id: res.id,
            ...res._doc
        }
    // }
    // }

};

const endpointSecret = "whsec_8effc9472e7de8926cb8afa4c3eefcc755463df7177411ab53abfae1d078211a";

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    // console.log(process.env.STRIPE_S_KEY);
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