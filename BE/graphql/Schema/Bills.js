import { gql } from "apollo-server-core"

const Billtype = gql`
scalar Number                       
type address{
  city:String
  country:String
  line1:String
  line2:String
  postal_code:String
  state:String
}
type shipping{
  address:address
  email:String
  name:String
  phone:String
}
type Product{
      customerId: String,
      userId:String
      name: String,
      quantity: Number,
      price: Number,
      totalPrice: Number,
      image: String
    }
type Bills{ 
  id:ID
  customerId: String
  InvoiceNumber:String
  invoice_url:String
  invoice_pdf:String
  payment_status:String
  shipping:shipping
  Product:[Product]
  } 

type Query{
    Bills:[Bills]
    getBills(id:ID):Bills 
}
`
export default Billtype
