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
import stripeRoute from "./routes/subs.js"
import admin from "./routes/admin.js"

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use("/api/products", productsRoute);
app.use("/", admin)
app.use("/api/stripe", stripeRoute)
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