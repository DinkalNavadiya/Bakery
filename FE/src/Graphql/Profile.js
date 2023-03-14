import { gql } from "@apollo/client";
export const Profiles = gql`
{
    Profile{
        id
        userId
        Image
        name
        email
        phone_number
        role
    }
}`

export const getProfile = gql`
    query getProfile($id:ID){
        getProfile(id: $id){
        id
        userId
        Image
        name
        email
        phone_number
        role
        }
    }
`

export const Add_Profile = gql`
mutation addProfile($userId: ID, $name: String, $email: String, $phone_number: PhoneNumber, $role: String){
  addProfile(userId: $userId, name: $name, email: $email, phone_number: $phone_number, role: $role){
    id
    userId
    Image
    name
    email
    phone_number
    role
  }
}
`
export const Delete_Profile = gql`
   mutation deleteProfile($id: ID){
  deleteProfile(id: $id)
}
`

export const Update_Profile = gql`
   mutation updateProfile($id: ID, $userId: ID, $Image: String, $name: String, $email: String, $phone_number: PhoneNumber, $role: String){
  updateProfile(id: $id, userId: $userId, Image: $Image, name: $name, email: $email, phone_number: $phone_number, role: $role){
    id
    userId
    Image
    name
    email
    phone_number
    role
  }
}
`