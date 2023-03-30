import { gql } from "@apollo/client";
export const Carts = gql`
query Carts($userId:ID){
    Carts(userId:$userId){   
        count
        Item{
          id
          customerId
          userId
          productId
          name
          weight
          quantity
          price
          totalPrice
          image
          Stripe_Id
          Stripe_priceId
        }
        data{
            id
            customerId
            userId
            productId
            name
            weight
            quantity
            price
            totalPrice
            image
            Stripe_Id
            Stripe_priceId
        }
    }
}
`

export const getCart = gql`
    query getCarts($id:ID){
        getCarts(id:$id){
         id
         customerId
         userId
         productId
         name
         weight
         quantity
         price
         totalPrice
         image
         Stripe_Id
         Stripe_priceId
        }
    }
`

export const Add_Cart = gql`
   mutation addCarts($cartInput: CartInput){
    addCarts(cartInput:$cartInput){
        id
        customerId
        userId
        productId
        name
        weight
        quantity
        price
        totalPrice
        image
        Stripe_Id
        Stripe_priceId
    }
   }
`
export const Delete_Cart = gql`
  mutation deleteCart($id:ID){
    deleteCart(id:$id)
  }
`
export const update_Carts = gql`
     mutation updateCarts($id:ID, $quantity:Number , $totalPrice:Number){
       updateCarts(id:$id , quantity:$quantity , totalPrice:$totalPrice){
        id
        customerId
        userId
        productId
        name
        weight
        quantity
        price
        totalPrice
        image
        Stripe_Id
        Stripe_priceId
       }
     }
`

export const Badges = gql`
   query Badge($userId:ID){
    Badge(userId:$userId){
        userId
        count
    }
   }
`

export const CART_SUBSCRIPTION = gql`
    subscription CartCreated{
      CartCreated{
        id
        customerId
        userId
        productId
        name
        weight
        quantity
        price
        totalPrice
        image
        Stripe_Id
        Stripe_priceId
      }
    }
`