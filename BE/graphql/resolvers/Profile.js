import { ApolloError } from "apollo-server-express"
import Profile from "../../Modal/Profiles.js"
const Profiles = {
    Query:{
        Profile: async () => {
            const profile = await Profile.find()
            return profile
        },
        getProfile: async(root , args) => {
            const profile = await Profile.findById(args.id)
            return profile
        }
    },
    Mutation:{
        addProfile: async(root , args) => {
            let newProfile = new Profile({
                userId:args.userId,
                name: args.name,
                email:args.email,
                phone_number:args.phone_number,
                role:args.role
            });
            return newProfile.save();
        },
        deleteProfile:async(root , args) => {
            await Profile.findByIdAndDelete(args.id)
            return "Product is deleted"
        },
        updateProfile:async(root , args) => {
            const {id , userId , Image , name , email , phone_number , role} = args
            const updProfile = {}
            updProfile.userId = userId
            updProfile.Image = Image 
            updProfile.name = name
            updProfile.email = email
            updProfile.phone_number = phone_number
            updProfile.role = role
            const profile = await Profile.findByIdAndUpdate(id , updProfile , {new: true})
            return profile
        },
    }, 
}

export default Profiles