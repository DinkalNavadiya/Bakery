import { gql } from "apollo-server-core"

const Usertype = gql`
  scalar PhoneNumber                 
  type User{                       
    id:ID                       
    name:String                       
    email:String                       
    password:String     
    phone_number:PhoneNumber                       
    token:String 
    RoleId:ID
    role:String
    createdBy:ID
    Stripe_Id: String
    ver_code:String
  } 
  input RegisterInput{                
    name:String                
    email:String                
    password:String
    phone_number:PhoneNumber
    RoleId:ID
    role:String
    createdBy:ID
    Stripe_Id: String
  }
  input LoginInput{
    email:String
    password:String
  }
  type messagePass {
    message:String
    success:String
  } 
  type Query{
    User:[User]                       
   getUser(id:ID):User
  }

  type Mutation{
    registerUser(registerInput: RegisterInput):User                       
    loginUser(loginInput: LoginInput):User                       
    deleteUser(id:ID):String   
    changePassword( email:String , oldPassword:String , newPassword:String): User
  } 
`

export default Usertype