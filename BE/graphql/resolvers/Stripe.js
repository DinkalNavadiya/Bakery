import Stripe from 'stripe';
import Carts from '../../Modal/Cart.js';
const FRONTEND_DOMAIN = "http://localhost:3000"

const Stripes = {
  Query: {
    createCheckoutSession: async (_, args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const userId = args.userId
      const Stripe_Id = args.Stripe_Id
      const GroupData = await Carts.find({ userId });
      const cancel = FRONTEND_DOMAIN + "/cart"
      const success = FRONTEND_DOMAIN + "/success"
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        submit_type: 'donate',
        shipping_address_collection: {
          allowed_countries: ["IN", "US", "CA", "KE"]
        },
        // discounts: [{
        //   coupon: 'JWac2dvL',
        // }],
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "inr",
              },
              display_name: "By shipping",
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
              display_name: "Air By Next Day",
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
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 300 * 100,
                currency: "inr",
              },
              display_name: "Air By in Hours",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: 'hour',
                  value: 4,
                },
                maximum: {
                  unit: 'hour',
                  value: 8,
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
        cancel_url: session.cancel_url
      })
    },
    paymentLink: async (args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const invoices = await stripe.invoices.list({
        limit: 20,
      });
      console.log(invoices);
    },
    Subscription: async (_, args) => {
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
    testSubscription: async (_, args) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const invoice = await stripe.invoices.retrieve(
        'in_1Mok1xSFJIURXQaEIzGADiT6'
      );
      console.log(invoice);
    }
  }

}

export default Stripes
