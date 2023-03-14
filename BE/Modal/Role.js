import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;;
const RoleSchema = new mongoose.Schema({
    RoleName: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: ObjectId,
        ref: 'User'
    },
    permissions: {
        type:Array,
        default:[]
    },
}, { timestamps: true })

const Role = mongoose.model('Role', RoleSchema)

export default Role
