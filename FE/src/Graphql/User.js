import { gql } from "@apollo/client"
export const Users = gql`
{
    User{
        id
        name
        email
        password
        phone_number
        token
        RoleId
        role
        createdBy
        Stripe_Id
        ver_code
    }
}
`
export const getUsers = gql`
   query getUser($id:ID){
       getUser(id:$id){
        id
        name
        email
        password
        phone_number
        token
        RoleId
        role
        createdBy
        Stripe_Id
        ver_code
       }
   }
`
export const Register_User = gql`
  mutation Mutation(
    $registerInput:RegisterInput
  ){
    registerUser(
        registerInput:$registerInput
    ){
        id
        name
        email
        password
        phone_number
        token
        RoleId
        role
        createdBy
        Stripe_Id
        ver_code
    }
  }
`

export const Login_User = gql`
mutation Mutation(
  $loginInput:LoginInput
){
  loginUser(
    loginInput:$loginInput
  ){
    id
    name
    email
    password
    phone_number
    token
    RoleId
    role
    createdBy
    Stripe_Id
    ver_code
  }
}
`

export const User_delete = gql`
mutation deleteUser($id:ID){
  deleteUser(id:$id)
 }
`
