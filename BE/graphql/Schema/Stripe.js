import { gql } from "apollo-server-core"

const Stripes = gql`
scalar Number   
# type Invoice{
#   id:ID
#   userId:ID
#   amount_paid:Number
#   status:String
#   total:Number
# }
# input InvoiceInput{
#     userId:ID 
# }

  #   enum AllowedColor {
  #   RED
  #   GREEN
  #   BLUE
  # }

    type Query{
      # Invoice(userId:ID):[Invoice]
      createCheckoutSession(userId:ID , email:String , Stripe_Id:String):String
      paymentLink:String
      subscription(userId:ID , price:String , Stripe_Id:String):String
      multipleSubscription(userId:ID , email:String, Stripe_Id:String):String
    # pickColor(color: AllowedColor): String
    testSubscription:String
    }
    # type Mutation{

    # }
`
export default Stripes