import { gql } from "@apollo/client";
export const Carts = gql`
{
    Carts{   
        count
        data{
            id
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
      userId
      productId
      name
      weight
      quantity
      price
      totalPrice
      image
      # Stripe_Id
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
      userId
      productId
      name
      weight
      quantity
      price
      totalPrice
      image
      }
    }
`