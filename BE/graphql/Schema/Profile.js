import { gql } from "apollo-server-core"

const ProfileType = gql`
  scalar PhoneNumber                 
type Profile{
    id:ID
    userId:ID
    Image:String
    name:String
    email:String
    phone_number:PhoneNumber
    role:String
} 
type Query{
    Profile:[Profile]
    getProfile(id:ID):Profile
}
type Mutation{
    addProfile(userId:ID , name:String , email:String , phone_number:PhoneNumber , role:String):Profile
    deleteProfile(id:ID):String
    updateProfile(id:ID , userId:ID , Image:String , name:String , email:String , phone_number:PhoneNumber , role:String):Profile
}
`

export default ProfileType  