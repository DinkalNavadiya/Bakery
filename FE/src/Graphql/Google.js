export const GoogleLogin = gql`
{
    Google{
        id
        name
        email
        avatar
        provider
        providerId
    }
} 
`

export const Add_Google = gql`
    mutation googleAuth($idToken: String){
  googleAuth(idToken: $idToken){
    id
    name
    email
    avatar
    provider
    providerId
  }
}
`