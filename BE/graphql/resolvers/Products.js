import { PubSub } from "graphql-subscriptions";
import Products from "../../Modal/Product.js"
import Stripe from 'stripe';

const pubsub = new PubSub();
const Product = {
  Query: {
    Products: async (_, args, resolve, res) => {
      return new Promise(async (resolve, reject) => {
        const skip = (args.page - 1) * parseInt(args.limit);
        const total = await Products.countDocuments();
        const product = await Products.find().sort({ _id: 1 }).skip(skip).limit(args.limit);
        resolve({ count: total, data: product });
      })
    },
    getProduct: async (root, args) => {
      const products = await Products.findById(args.id)
      return products
    },
  },
  Mutation: {
    addProducts: async (args, { productInput: { name, weight, Dt_Mfg, Dt_Exp, price, image, Recurring } }) => {
      const stripe = new Stripe(process.env.STRIPE_S_KEY)
      const product = await stripe.products.create({
        name: name,
        default_price_data: {
          unit_amount: price * 100,
          currency: 'inr',
          recurring: { interval: Recurring },
        },
        metadata: {
          'Products_weight': weight,
          'Date_manufacture': Dt_Mfg,
          'Date_expiry': Dt_Exp,
        }
      });
      console.log(Recurring);
      let newProduct = new Products({
        name: name,
        weight: weight,
        Dt_Mfg: Dt_Mfg,
        Dt_Exp: Dt_Exp,
        price: price,
        image: image,
        Stripe_Id: product.id,
        Stripe_priceId: product.default_price
      });
      const res = await newProduct.save();
      return {
        id: res.id,
        ...res._doc
      }
    },
    deleteProducts: async (root, args) => {
      await Products.findByIdAndDelete(args.id)
      return "Product is deleted"
    },
    updateProducts: async (root, args) => {
      const { id, name, weight, Dt_Mfg, Dt_Exp, price, image } = args
      const updProduct = {};
      updProduct.name = name
      updProduct.weight = weight
      updProduct.Dt_Mfg = Dt_Mfg
      updProduct.Dt_Exp = Dt_Exp
      updProduct.price = price
      updProduct.image = image
      const user = await Products.findByIdAndUpdate(id, updProduct, { new: true })
      return user;
    },
  },
  Subscription: {
    ProductCreated: {
      subscribe: () => pubsub.asyncIterator('PRODUCT')
    }
  }
}

export default Product
