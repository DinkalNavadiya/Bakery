import { gql } from "@apollo/client";
export const Bills = gql`
{
    Bills{
        id
        customerId
        paymentIntentId
        subtotal
        total
        shipping{
            address{
                city
                country
                line1
                line2
                postal_code
                state
            }
            email
            name
            phone
        }
        payment_status  
    }
}
`

export const getBill = gql`
    query getBills($id:ID){
        getBills(id:$id){
        id
        customerId
        paymentIntentId
        subtotal
        total
        shipping{
            address{
                city
                country
                line1
                line2
                postal_code
                state
            }
            email
            name
            phone
        }
        payment_status  
    }
    }
`

