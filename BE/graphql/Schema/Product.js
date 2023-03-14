import { gql } from "apollo-server-core";

const Producttype = gql`
scalar Number                       
scalar Date
type Products{                       
    id:ID             
    name:String                       
    weight:Number                       
    Dt_Mfg:Date                       
    Dt_Exp:Date    
    price:Number                       
    image:String    
    Stripe_Id:String      
    Stripe_priceId: String             
} 
type ProductPaginatedData {
    count: Int
    data: [Products]
  }
type Query{
    Products(page: Int limit: Int filter: String sort: Int):ProductPaginatedData  
    getProduct(id:ID):Products 
}
input ProductInput{
    name:String                       
    weight:Number                       
    Dt_Mfg:Date                       
    Dt_Exp:Date      
    price:Number                       
    image:String
}
type Mutation{
    addProducts(productInput:ProductInput):Products
    deleteProducts(id:ID):String                       
    updateProducts(id:ID , name:String ,weight:Number, Dt_Mfg:Date , Dt_Exp:Date , price:Number ,image:String):Products                       
}
type Subscription{
    ProductCreated:Products
}
`

export default Producttype 