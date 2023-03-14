import Role from "../../Modal/Role.js"
const Roles = {
    Query:{
        getAllRole: async () => {
            const roles = await Role.find()
            return roles
        },
        getSingleRole:async(root , args) => {
            const roles = await Role.findById(args.id)
            return roles
        }
    }
}
export default Roles