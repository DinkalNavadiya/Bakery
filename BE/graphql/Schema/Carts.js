import { gql } from "apollo-server-core"

const Carttype = gql`
scalar Number    
scalar Int

type Carts{                       
    id:ID     
    customerId:String
    userId:ID         
    productId:ID         
    name:String                       
    weight:Number  
    quantity:Number
    price:Number
    totalPrice:Number
    image:String  
    Stripe_Id:String
    Stripe_priceId: String             
  } 
  
  type CartData {
    count: Int
    data: [Carts]
  }
  type Badge{
    userId:ID
    count:Int
  }
type Query{
    Carts:CartData                       
    getCarts(id:ID):Carts 
    Badge(userId:ID):Badge

}
input CartInput{
  customerId:String
    userId:ID         
    productId:ID         
    name:String                       
    weight:Number  
    quantity:Number
    price:Number
    totalPrice:Number
    image:String  
    Stripe_Id:String
    Stripe_priceId: String             
}
type Mutation{
    addCarts(cartInput:CartInput):Carts                     
    deleteCart(id:ID):String      
    updateCarts(id:ID , quantity:Number , totalPrice:Number):Carts
}
type Subscription{
    CartCreated:Carts
}
`
export default Carttype