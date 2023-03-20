import { gql } from "@apollo/client";
export const Products = gql`
     query Products($page: Int , $limit: Int , $filter: String ,$sort:Int){
        Products(page:$page,limit:$limit,filter:$filter,sort:$sort){
            count
            data{
                id
                name
                weight
                Dt_Mfg
                Dt_Exp
                price
                image
                Stripe_Id
                Stripe_priceId{
                    priceId
                    time
                }
                Recurring
        }
        }
     }
`

export const getProducts = gql`
    query getProduct($id:ID){
        getProduct(id:$id){
        id
        name
        weight
        Dt_Mfg
        Dt_Exp
        price
        image
        Stripe_Id
        Stripe_priceId{
                    priceId
                    time
                }
        Recurring
        }
    }
`
export const Add_Product = gql`
    mutation addProducts($productInput:ProductInput){
        addProducts(productInput:$productInput){
            id
            name
            weight
            Dt_Mfg
            Dt_Exp
            price
            image
            Stripe_Id
            Stripe_priceId{
                    priceId
                    time
                }
            Recurring
        }
    }
`

export const Delete_Product = gql`
   mutation deleteProducts($id:ID){
    deleteProducts(id:$id)
   }
`

export const Update_Products = gql`
   mutation updateProducts($id:ID , $name:String ,$weight:Number, $Dt_Mfg:Date , $Dt_Exp:Date , $price:Number ,$image:String){
    updateProducts(id:$id , name:$name ,weight:$weight, Dt_Mfg:$Dt_Mfg , Dt_Exp:$Dt_Exp , price:$price ,image:$image){
        id
        name
        weight
        Dt_Mfg
        Dt_Exp
        price
        image
    } 
   }
`

