// import { gql } from "apollo-server-core";

// const Googletype = gql`
//    input authInput {
//        idToken: String
//    }
//    type successInfo {
//        message: String
//        success: Boolean
//    }
//    type Mutation{
//        googleAuth(input : authInput) : successInfo
//    }
// `

// export default Googletype

import { gql } from "apollo-server-core";

const Googletype = gql`
   type successInfo {
       message: String
       success: Boolean
   }
   type GUser {
        id:ID
        name: String
        email: String
        avatar: String
        provider: String
        providerId: String
   }
   type Query {
       Google : GUser
   }
   type Mutation{
       googleAuth(idToken: String) : GUser
   }
`

export default Googletype