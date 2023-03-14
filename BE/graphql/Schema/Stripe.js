import { gql } from "apollo-server-core"

const Stripes = gql`
scalar Number   
    type Query{
      createCheckoutSession(userId:ID , email:String , Stripe_Id:String):String
      paymentLink:String
      subscription(userId:ID , price:String , Stripe_Id:String):String
      multipleSubscription(userId:ID , email:String, Stripe_Id:String):String
      testSubscription:String
    }
`
export default Stripes