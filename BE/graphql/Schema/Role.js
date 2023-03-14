// import { gql } from "apollo-server-core"
// const role = gql`
// type Role{
//     id:ID
//     roleName:String
//     permission:[JSON]
//     isActive:Boolean
//     CreatedAt:Date
//     updatedAt:Date
//   } 

// 	input inputRole {
// 		Id: ID!
// 		roleName: String
// 		isActive: Boolean
// 	}

// 	extend type Query {
// 		getAllRole: [Role]
// 	}

// 	extend type Mutation {
// 		addRole(roleName: String): Role
// 		updateRole(input: inputRole): Role
// 		removeRole(id: ID): Boolean
// 	}
// `

// export default role
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