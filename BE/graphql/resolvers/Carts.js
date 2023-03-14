import Carts from '../../Modal/Cart.js'
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const Cart = {
    Query: {
        Carts: async (_, args) => {
            return new Promise(async (resolve, reject) => {
                const total = await Carts.find().count();
                const cart = await Carts.find();
                resolve({ count: total, data: cart });
            })
        },
        getCarts: async (root, args) => {
            const carts = await Carts.findById(args.id);
            return carts;
        },
        Badge: async (_, args) => {
            return new Promise(async (resolve) => {
                const userId = args.userId
                const total = await Carts.find({ userId }).count()
                resolve({ userId: args.userId, count: total })
            })
        }
    },
    Mutation: {
        async addCarts(args, { cartInput: { userId, productId, name, weight, quantity, price, image, Stripe_Id, Stripe_priceId } }) {
            const oldProduct = await Carts.findOne({ userId, productId });

            if (oldProduct) {
                const updCart = {};
                updCart.userId = userId
                updCart.productId = productId
                updCart.name = name
                updCart.weight = weight
                updCart.quantity = oldProduct.quantity + 1
                updCart.price = price
                updCart.totalPrice = oldProduct.price * oldProduct.quantity || price * 1
                updCart.image = image
                const cart = await Carts.findOneAndUpdate({ userId, productId }, { $set: updCart }, { new: true })
                return cart;
            }

            let newCart = new Carts({
                userId: userId,
                productId: productId,
                name: name,
                weight: weight,
                quantity: quantity || 1,
                price: price,
                totalPrice: price * quantity || price * 1,
                image: image,
                Stripe_Id: Stripe_Id,
                Stripe_priceId: Stripe_priceId
            });
            const res = await newCart.save()
            return {
                id: res._id,
                ...res._doc,
            }
        }
        ,
        deleteCart: async (_, args) => {
            await Carts.findByIdAndDelete(args.id)
            return "cart is deleted"
        },
        updateCarts: async (root, args) => {
            const { id, quantity, totalPrice } = args
            const updCart = {};
            updCart.quantity = quantity
            updCart.totalPrice = totalPrice
            const cart = await Carts.findByIdAndUpdate(id, updCart, { new: true })
            return cart;
        },
    },
    Subscription: {
        CartCreated: {
            subscribe: () => pubsub.asyncIterator('CARTS')
        }
    }
}
export default Cart;

