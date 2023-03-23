import { gql } from "@apollo/client";


export const CHECKOUT = gql`
query createCheckoutSession($userId:ID , $email:String , $Stripe_Id:String){
    createCheckoutSession(userId:$userId , email:$email , Stripe_Id:$Stripe_Id)
    }
`
export const Subscription = gql`
  query Subscription($userId:ID , $price:String , $Stripe_Id:String){
    Subscription(userId:$userId , price:$price , Stripe_Id:$Stripe_Id)
  }
`