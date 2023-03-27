import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    required: [true, 'User name is required']
  },
  email: {
    type: String,
    // index:true,
    // required: true
    // validate: {
    //   validator: function (v) {
    //     return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid Email Address!`
    // },
    required: [true, 'User Email Address is required']
  },
  password: {
    type: String,
    // required: true
    required: [true, 'User Password Address is required'],
  },
  phone_number: {
    type: String,
    // required: true
    // validate: {
    //   validator: function (v) {
    //     return /\d{3}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // },
    required: [true, 'User phone number required']
  },
  token: { type: String },
  RoleId: {
    type: ObjectId,
    ref: 'Role'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
  },
  createdBy: {
    type: ObjectId
  },
  Stripe_Id: {
    type: String,
    required: true
  },
  ver_code: {
    type: String,
    required: true
  }
}, { timestamps: true })
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await this.generatePasswordHash();
  }
});
UserSchema.methods.generatePasswordHash = async function () {
  const user = this;
  const saltRounds = 10;    //controls how much time is needed to calculate a single BCrypt hash
  return await bcrypt.hash(user.password, saltRounds);
};
const Users = mongoose.model('User', UserSchema)
export default Users