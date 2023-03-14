import { gql } from "@apollo/client";

export const Subscription = gql`
      query subscription($userId:ID , $price:String){
        subscription(userId:$userId , price:$price)
      }
`
export const CHECKOUT = gql`
query createCheckoutSession($userId:ID , $email:String , $Stripe_Id:String){
    createCheckoutSession(userId:$userId , email:$email , Stripe_Id:$Stripe_Id)
    }
`

export const MULSUB = gql`
   query multipleSubscription($userId:ID , $email:String ,  $Stripe_Id:String){
    multipleSubscription(userId:$userId , email:$email ,Stripe_Id:$Stripe_Id)
   }
`