import { gql } from "apollo-server-core";

const Roletype = gql`
scalar JSON
   type Role{
       id: ID!
       RoleName: String
       isActive:Boolean
       permission:[JSON]
   }
   input RoleInput{
    # id:ID
    RoleName: String
    permissions: [JSON]
    isActive:Boolean
   }
   type Query{
       getAllRole:[Role]
       getSingleRole(id:ID) : Role
   }
#    type Mutation{
#        createRole(input: RoleInput): Role
#     #    deleteRole(id: ID! , log:RoleInput):Role
#    }
`

export default Roletype