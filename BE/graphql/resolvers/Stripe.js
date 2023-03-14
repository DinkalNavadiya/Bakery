import Stripe from 'stripe';
import Carts from '../../Modal/Cart.js';
import Bills from '../../Modal/Bill.js';
const FRONTEND_DOMAIN = "http://localhost:3000"

const Stripes = {
  Query: {
    // Invoice: async () => {
    //   const invoice = await Bills.find();
    //   return invoice
    // },
    createCheckoutSession: async (_, args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const userId = args.userId
      const Stripe_Id = args.Stripe_Id
      const GroupData = await Carts.find({ userId });
      const cancel = FRONTEND_DOMAIN + "/cart"
      const success = FRONTEND_DOMAIN + "/success"
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // submit_type: 'donate',
        shipping_address_collection: {
          allowed_countries: ["IN", "US", "CA", "KE"]
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "inr",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 150 * 100,
                currency: "inr",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true
        },
        line_items: GroupData.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        mode: 'payment',
        invoice_creation: { enabled: true },
        customer: Stripe_Id,
        success_url: success,
        cancel_url: cancel
      })
      return JSON.stringify({
        url: session.url,
      })
    },
    paymentLink: async (args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const invoices = await stripe.invoices.list({
        limit: 20,
      });
      console.log(invoices);
    },
    subscription: async (_, args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const Stripe_Id = args.Stripe_Id
      const cancel = FRONTEND_DOMAIN + "/"
      const success = FRONTEND_DOMAIN + "/success"
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["IN", "US", "CA", "KE"]
        },
        customer: args.Stripe_Id,
        billing_address_collection: 'auto',
        mode: "subscription",
        phone_number_collection: {
          enabled: true
        },
        line_items: [
          {
            // currency: "inr",
            price: args.price,
            quantity: 1,
          },
        ],
        customer: Stripe_Id,
        success_url: success,
        cancel_url: cancel,
      })
      return JSON.stringify({
        url: session.url,
      })
    },
    multipleSubscription: async (_, args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const cancel = FRONTEND_DOMAIN + "/cart"
      const success = FRONTEND_DOMAIN + "/success"
      const userId = args.userId
      const Stripe_Id = args.Stripe_Id
      const GroupData = await Carts.find({ userId });
      const subscription = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["IN", "US", "CA", "KE"]
        },
        customer: Stripe_Id,
        billing_address_collection: 'auto',
        mode: "subscription",
        phone_number_collection: {
          enabled: true
        },
        line_items: GroupData.map((item) => {
          return {
            price: item.Stripe_priceId,
            quantity: 1,
          }
        }),
        success_url: success,
        cancel_url: cancel,
      })
      // console.log(subscription);
      return JSON.stringify({
        url: subscription.url,
      })
    },
    testSubscription: async () => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)

      //   const subscription = await stripe.subscriptions.create({
      //     customer: 'cus_NW6E0Jpy04xIlZ',
      //     items: [{price: 'price_1Ml5CsSDBdFF0CAL6nDEefqx'}],
      //     add_invoice_items: [{price: 'price_1Ml5CsSDBdFF0CAL6nDEefqx'}],
      //   });
      //   console.log(subscription);
      // const session = await stripe.checkout.sessions.retrieve(
      //   'cs_test_a1x01rL8q1ekDqOvVrZ8WjCsnLVTSsc1Tl84c0CmuIAamxJbEjKeFVDtnb'
      // );
      const invoice = await stripe.invoices.retrieve(
        'in_1Ml97kSDBdFF0CALp1tu8OfH'
      );
      console.log(invoice);
    }
    // pickColor(_, { color }) {
    //   return color;
    // }
  }

}

export default Stripes



// const typeDefs = gql`
//   type Order {
//     customerName: String!
//     customerAddress: String!
//     products: [Product!]!
//     orderStatus: OrderStatus!
//   }

//   enum OrderStatus {
//     SUBMITTED
//     CONFIRMED
//     SHIPPED
//     DELIVERED
//     CANCELLED
//   }
// `